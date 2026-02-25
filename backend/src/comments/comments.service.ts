import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from '../posts/entities/post.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentEntity } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentsRepository: Repository<CommentEntity>,
    @InjectRepository(PostEntity)
    private readonly postsRepository: Repository<PostEntity>,
  ) {}

  async listByPostSlug(slug: string, page = 1, limit = 20) {
    const post = await this.postsRepository.findOne({ where: { slug, isPublished: true } });
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const safePage = Math.max(page, 1);
    const safeLimit = Math.min(Math.max(limit, 1), 50);

    const [items, total] = await this.commentsRepository.findAndCount({
      where: { postId: post.id },
      order: { createdAt: 'DESC' },
      skip: (safePage - 1) * safeLimit,
      take: safeLimit,
    });

    return {
      items,
      total,
      page: safePage,
      limit: safeLimit,
      totalPages: Math.max(1, Math.ceil(total / safeLimit)),
    };
  }

  async createForPostSlug(
    slug: string,
    user: { id: number; name?: string; email: string },
    dto: CreateCommentDto,
  ) {
    const post = await this.postsRepository.findOne({ where: { slug, isPublished: true } });
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const comment = this.commentsRepository.create({
      postId: post.id,
      userId: user.id,
      userName: user.name || user.email.split('@')[0],
      content: dto.content.trim(),
    });

    return this.commentsRepository.save(comment);
  }
}