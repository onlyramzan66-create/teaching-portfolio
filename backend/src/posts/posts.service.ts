import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationsService } from '../notifications/notifications.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postsRepository: Repository<PostEntity>,
    private readonly notificationsService: NotificationsService,
  ) {}

  async listPublished(page = 1, limit = 12, q = '') {
    const safePage = Math.max(page, 1);
    const safeLimit = Math.min(Math.max(limit, 1), 30);
    const search = q.trim().toLowerCase();

    const query = this.postsRepository
      .createQueryBuilder('post')
      .where('post.isPublished = :isPublished', { isPublished: true })
      .orderBy('post.publishedAt', 'DESC')
      .addOrderBy('post.createdAt', 'DESC')
      .skip((safePage - 1) * safeLimit)
      .take(safeLimit);

    if (search) {
      query.andWhere(
        '(LOWER(post.title) LIKE :search OR LOWER(post.excerpt) LIKE :search OR LOWER(post.content) LIKE :search)',
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

  listAll(limit = 100) {
    return this.postsRepository.find({
      order: { updatedAt: 'DESC', createdAt: 'DESC' },
      take: Math.min(limit, 200),
    });
  }

  async getById(id: number) {
    const post = await this.postsRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  async getBySlug(slug: string) {
    const post = await this.postsRepository.findOne({ where: { slug, isPublished: true } });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  async create(dto: CreatePostDto) {
    const slug = await this.buildUniqueSlug(dto.slug ?? dto.title);
    const published = dto.isPublished ?? true;

    const post = this.postsRepository.create({
      title: dto.title.trim(),
      slug,
      excerpt: dto.excerpt?.trim() ?? '',
      content: dto.content.trim(),
      featureImage: dto.featureImage?.trim() || null,
      notesPdfUrl: dto.notesPdfUrl?.trim() || null,
      seoTitle: dto.seoTitle?.trim() || null,
      seoDescription: dto.seoDescription?.trim() || null,
      canonicalUrl: dto.canonicalUrl?.trim() || null,
      seoImage: dto.seoImage?.trim() || null,
      isPublished: published,
      publishedAt: published ? new Date() : null,
    });

    const saved = await this.postsRepository.save(post);
    if (saved.isPublished) {
      await this.notificationsService.notifyPublishedPost({
        title: `New Blog Post: ${saved.title}`,
        body: saved.excerpt || 'A new study post is now live on GoharOnline.',
        url: this.buildPostUrl(saved.slug),
        tag: 'blog-post',
      });
    }

    return saved;
  }

  async update(id: number, dto: UpdatePostDto) {
    const post = await this.postsRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (dto.slug && dto.slug !== post.slug) {
      post.slug = await this.buildUniqueSlug(dto.slug, id);
    }

    if (dto.title !== undefined) {
      post.title = dto.title.trim();
      if (!dto.slug) {
        post.slug = await this.buildUniqueSlug(dto.title, id);
      }
    }

    if (dto.excerpt !== undefined) {
      post.excerpt = dto.excerpt.trim();
    }

    if (dto.content !== undefined) {
      post.content = dto.content.trim();
    }

    if (dto.featureImage !== undefined) {
      post.featureImage = dto.featureImage.trim() || null;
    }

    if (dto.notesPdfUrl !== undefined) {
      post.notesPdfUrl = dto.notesPdfUrl.trim() || null;
    }

    if (dto.seoTitle !== undefined) {
      post.seoTitle = dto.seoTitle.trim() || null;
    }

    if (dto.seoDescription !== undefined) {
      post.seoDescription = dto.seoDescription.trim() || null;
    }

    if (dto.canonicalUrl !== undefined) {
      post.canonicalUrl = dto.canonicalUrl.trim() || null;
    }

    if (dto.seoImage !== undefined) {
      post.seoImage = dto.seoImage.trim() || null;
    }

    const wasPublished = post.isPublished;

    if (dto.isPublished !== undefined) {
      post.isPublished = dto.isPublished;
      post.publishedAt = dto.isPublished ? post.publishedAt ?? new Date() : null;
    }

    const saved = await this.postsRepository.save(post);
    if (!wasPublished && saved.isPublished) {
      await this.notificationsService.notifyPublishedPost({
        title: `New Blog Post: ${saved.title}`,
        body: saved.excerpt || 'A new study post is now live on GoharOnline.',
        url: this.buildPostUrl(saved.slug),
        tag: 'blog-post',
      });
    }

    return saved;
  }

  async remove(id: number) {
    const post = await this.postsRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    await this.postsRepository.remove(post);
    return { success: true };
  }

  private async buildUniqueSlug(raw: string, excludeId?: number) {
    const base = raw
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 180) || `post-${Date.now()}`;

    let slug = base;
    let counter = 1;

    while (true) {
      const existing = await this.postsRepository.findOne({ where: { slug } });
      if (!existing || existing.id === excludeId) {
        return slug;
      }

      if (counter > 99) {
        throw new ConflictException('Could not generate a unique slug');
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
