import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationsService } from '../notifications/notifications.service';
import { PostEntity } from '../posts/entities/post.entity';
import { ApproveStudentArticleDto } from './dto/approve-student-article.dto';
import { CreateStudentArticleDto } from './dto/create-student-article.dto';
import { StudentArticle, StudentArticleStatus } from './entities/student-article.entity';

@Injectable()
export class StudentArticlesService {
  constructor(
    @InjectRepository(StudentArticle)
    private readonly studentArticlesRepository: Repository<StudentArticle>,
    @InjectRepository(PostEntity)
    private readonly postsRepository: Repository<PostEntity>,
    private readonly notificationsService: NotificationsService,
  ) {}

  async create(dto: CreateStudentArticleDto) {
    const article = this.studentArticlesRepository.create({
      studentName: dto.studentName.trim(),
      title: dto.title.trim(),
      article: dto.article.trim(),
      imageUrl: dto.imageUrl?.trim() || null,
      notesPdfUrl: dto.notesPdfUrl?.trim() || null,
      status: StudentArticleStatus.PENDING,
    });

    const saved = await this.studentArticlesRepository.save(article);
    return {
      id: saved.id,
      message: 'Article submitted successfully. It will be published after admin approval.',
      status: saved.status,
    };
  }

  async listApproved(page = 1, limit = 9, q = '') {
    const safePage = Math.max(page, 1);
    const safeLimit = Math.min(Math.max(limit, 1), 30);
    const search = q.trim().toLowerCase();

    const query = this.studentArticlesRepository
      .createQueryBuilder('article')
      .where('article.status = :status', { status: StudentArticleStatus.APPROVED })
      .orderBy('article.approvedAt', 'DESC')
      .addOrderBy('article.createdAt', 'DESC')
      .skip((safePage - 1) * safeLimit)
      .take(safeLimit);

    if (search) {
      query.andWhere(
        '(LOWER(article.title) LIKE :search OR LOWER(article.article) LIKE :search OR LOWER(article.studentName) LIKE :search)',
        { search: `%${search}%` },
      );
    }

    const [items, total] = await query.getManyAndCount();

    return {
      items,
      total,
      page: safePage,
      limit: safeLimit,
      q: search,
      totalPages: Math.max(1, Math.ceil(total / safeLimit)),
    };
  }

  async adminList(status?: string, page = 1, limit = 20, q = '') {
    const safePage = Math.max(page, 1);
    const safeLimit = Math.min(Math.max(limit, 1), 50);
    const search = q.trim().toLowerCase();

    const query = this.studentArticlesRepository
      .createQueryBuilder('article')
      .orderBy('article.createdAt', 'DESC')
      .skip((safePage - 1) * safeLimit)
      .take(safeLimit);

    if (status && Object.values(StudentArticleStatus).includes(status as StudentArticleStatus)) {
      query.where('article.status = :status', { status });
    }

    if (search) {
      if (query.expressionMap.wheres.length === 0) {
        query.where(
          '(LOWER(article.title) LIKE :search OR LOWER(article.article) LIKE :search OR LOWER(article.studentName) LIKE :search)',
          { search: `%${search}%` },
        );
      } else {
        query.andWhere(
          '(LOWER(article.title) LIKE :search OR LOWER(article.article) LIKE :search OR LOWER(article.studentName) LIKE :search)',
          { search: `%${search}%` },
        );
      }
    }

    const [items, total] = await query.getManyAndCount();

    return {
      items,
      total,
      page: safePage,
      limit: safeLimit,
      q: search,
      totalPages: Math.max(1, Math.ceil(total / safeLimit)),
    };
  }

  async approve(id: number, dto: ApproveStudentArticleDto) {
    const article = await this.studentArticlesRepository.findOne({ where: { id } });
    if (!article) {
      throw new NotFoundException('Student article not found');
    }

    if (article.status === StudentArticleStatus.APPROVED) {
      return article;
    }

    const post = this.postsRepository.create({
      title: article.title,
      slug: await this.buildUniqueSlug(article.title),
      excerpt: `Submitted by ${article.studentName}`,
      content: article.article,
      featureImage: article.imageUrl,
      notesPdfUrl: article.notesPdfUrl,
      seoTitle: dto.seoTitle?.trim() || article.seoTitle || null,
      seoDescription: dto.seoDescription?.trim() || article.seoDescription || null,
      canonicalUrl: dto.canonicalUrl?.trim() || article.canonicalUrl || null,
      seoImage: dto.seoImage?.trim() || article.seoImage || article.imageUrl || null,
      isPublished: true,
      publishedAt: new Date(),
    });

    const savedPost = await this.postsRepository.save(post);

    article.status = StudentArticleStatus.APPROVED;
    article.approvedAt = new Date();
    article.publishedPostId = savedPost.id;
    article.seoTitle = dto.seoTitle?.trim() || article.seoTitle || null;
    article.seoDescription = dto.seoDescription?.trim() || article.seoDescription || null;
    article.canonicalUrl = dto.canonicalUrl?.trim() || article.canonicalUrl || null;
    article.seoImage = dto.seoImage?.trim() || article.seoImage || article.imageUrl || null;

    const savedArticle = await this.studentArticlesRepository.save(article);

    await this.notificationsService.notifyPublishedPost({
      title: `New Student Article: ${savedPost.title}`,
      body: `Shared by ${article.studentName}. Click to read the full article.`,
      url: this.buildPostUrl(savedPost.slug),
      tag: 'student-article',
    });

    return savedArticle;
  }

  async reject(id: number) {
    const article = await this.studentArticlesRepository.findOne({ where: { id } });
    if (!article) {
      throw new NotFoundException('Student article not found');
    }

    if (article.status === StudentArticleStatus.APPROVED) {
      throw new BadRequestException('Approved article cannot be rejected directly');
    }

    article.status = StudentArticleStatus.REJECTED;
    return this.studentArticlesRepository.save(article);
  }

  private async buildUniqueSlug(raw: string) {
    const base = raw
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 180) || `student-post-${Date.now()}`;

    let slug = base;
    let counter = 1;

    while (true) {
      const existing = await this.postsRepository.findOne({ where: { slug } });
      if (!existing) {
        return slug;
      }

      slug = `${base}-${counter}`;
      counter += 1;
    }
  }

  private buildPostUrl(slug: string) {
    const base = process.env.FRONTEND_URL?.replace(/\/$/, '') || 'http://localhost:3000';
    return `${base}/blog/${slug}`;
  }
}
