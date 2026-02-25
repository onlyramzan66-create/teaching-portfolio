import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTutorApplicationDto } from './dto/create-tutor-application.dto';
import { UpdateTutorApplicationStatusDto } from './dto/update-tutor-application-status.dto';
import { TutorApplication, TutorApplicationStatus } from './entities/tutor-application.entity';

@Injectable()
export class TutorApplicationsService {
  constructor(
    @InjectRepository(TutorApplication)
    private readonly tutorApplicationsRepository: Repository<TutorApplication>,
  ) {}

  async create(dto: CreateTutorApplicationDto) {
    const application = this.tutorApplicationsRepository.create({
      fullName: dto.fullName.trim(),
      email: dto.email.trim().toLowerCase(),
      phone: dto.phone.trim(),
      city: dto.city.trim(),
      teachingMode: dto.teachingMode.trim(),
      subjects: dto.subjects.trim(),
      experience: dto.experience.trim(),
      availability: dto.availability.trim(),
      coverMessage: dto.coverMessage.trim(),
      resumeUrl: dto.resumeUrl?.trim() || null,
      status: TutorApplicationStatus.PENDING,
    });

    const saved = await this.tutorApplicationsRepository.save(application);
    return {
      id: saved.id,
      status: saved.status,
      message: 'Tutor application submitted successfully. Our admin team will review it soon.',
    };
  }

  async adminList(status?: string, page = 1, limit = 20, q = '') {
    const safePage = Math.max(page, 1);
    const safeLimit = Math.min(Math.max(limit, 1), 50);
    const search = q.trim().toLowerCase();

    const query = this.tutorApplicationsRepository
      .createQueryBuilder('application')
      .orderBy('application.createdAt', 'DESC')
      .skip((safePage - 1) * safeLimit)
      .take(safeLimit);

    if (status && Object.values(TutorApplicationStatus).includes(status as TutorApplicationStatus)) {
      query.where('application.status = :status', { status });
    }

    if (search) {
      const where = `
        LOWER(application.fullName) LIKE :search
        OR LOWER(application.email) LIKE :search
        OR LOWER(application.subjects) LIKE :search
        OR LOWER(application.city) LIKE :search
      `;
      if (query.expressionMap.wheres.length === 0) {
        query.where(`(${where})`, { search: `%${search}%` });
      } else {
        query.andWhere(`(${where})`, { search: `%${search}%` });
      }
    }

    const [items, total] = await query.getManyAndCount();
    return {
      items,
      total,
      page: safePage,
      limit: safeLimit,
      totalPages: Math.max(1, Math.ceil(total / safeLimit)),
      q: search,
    };
  }

  async updateStatus(id: number, dto: UpdateTutorApplicationStatusDto) {
    const application = await this.tutorApplicationsRepository.findOne({ where: { id } });
    if (!application) {
      throw new NotFoundException('Tutor application not found');
    }

    application.status = dto.status;
    application.adminNotes = dto.adminNotes?.trim() || null;

    return this.tutorApplicationsRepository.save(application);
  }
}
