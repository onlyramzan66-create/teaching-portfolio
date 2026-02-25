import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';

type GoogleTokenInfo = {
  email?: string;
  name?: string;
  aud?: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signup(dto: SignupDto) {
    const adminSecret = this.configService.get<string>('ADMIN_SIGNUP_SECRET');
    const wantsAdmin = Boolean(dto.adminSecret);

    if (wantsAdmin && dto.adminSecret !== adminSecret) {
      throw new ForbiddenException('Invalid admin signup secret');
    }

    const user = await this.usersService.createUser({
      name: dto.name,
      email: dto.email,
      password: dto.password,
      role: wantsAdmin ? UserRole.ADMIN : UserRole.STUDENT,
    });

    return this.buildAuthResponse(user.id, user.email, user.role, user.name);
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return this.buildAuthResponse(user.id, user.email, user.role, user.name);
  }

  async googleAuth(credential: string) {
    const googleClientId = this.configService.get<string>('GOOGLE_CLIENT_ID', '');
    if (!googleClientId) {
      throw new UnauthorizedException('Google login is not configured');
    }

    const tokenInfoResponse = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`,
    );

    if (!tokenInfoResponse.ok) {
      throw new UnauthorizedException('Invalid Google credential');
    }

    const tokenInfo = (await tokenInfoResponse.json()) as GoogleTokenInfo;
    if (!tokenInfo.email || tokenInfo.aud !== googleClientId) {
      throw new UnauthorizedException('Invalid Google account data');
    }

    const email = tokenInfo.email.toLowerCase();
    const name = tokenInfo.name?.trim() || email.split('@')[0];

    let user = await this.usersService.findByEmail(email);
    if (!user) {
      user = await this.usersService.createUser({
        name,
        email,
        role: UserRole.STUDENT,
      });
    }

    return this.buildAuthResponse(user.id, user.email, user.role, user.name);
  }

  private buildAuthResponse(userId: number, email: string, role: UserRole, name: string) {
    const token = this.jwtService.sign({
      sub: userId,
      email,
      role,
      name,
    });

    return {
      accessToken: token,
      user: {
        id: userId,
        email,
        role,
        name,
      },
    };
  }
}
