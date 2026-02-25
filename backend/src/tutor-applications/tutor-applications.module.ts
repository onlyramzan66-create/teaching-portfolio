import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TutorApplication } from './entities/tutor-application.entity';
import { TutorApplicationsController } from './tutor-applications.controller';
import { TutorApplicationsService } from './tutor-applications.service';

@Module({
  imports: [TypeOrmModule.forFeature([TutorApplication])],
  controllers: [TutorApplicationsController],
  providers: [TutorApplicationsService],
})
export class TutorApplicationsModule {}
