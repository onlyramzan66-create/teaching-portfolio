import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsModule } from '../notifications/notifications.module';
import { PostEntity } from '../posts/entities/post.entity';
import { StudentArticle } from './entities/student-article.entity';
import { StudentArticlesController } from './student-articles.controller';
import { StudentArticlesService } from './student-articles.service';

@Module({
  imports: [TypeOrmModule.forFeature([StudentArticle, PostEntity]), NotificationsModule],
  controllers: [StudentArticlesController],
  providers: [StudentArticlesService],
})
export class StudentArticlesModule {}
