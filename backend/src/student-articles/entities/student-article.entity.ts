import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum StudentArticleStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity('student_articles')
export class StudentArticle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 140 })
  studentName: string;

  @Column({ length: 220 })
  title: string;

  @Column({ type: 'text' })
  article: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  imageUrl: string | null;

  @Column({ type: 'varchar', length: 500, nullable: true })
  notesPdfUrl: string | null;

  @Column({ type: 'varchar', length: 70, nullable: true })
  seoTitle: string | null;

  @Column({ type: 'varchar', length: 180, nullable: true })
  seoDescription: string | null;

  @Column({ type: 'varchar', length: 500, nullable: true })
  canonicalUrl: string | null;

  @Column({ type: 'varchar', length: 500, nullable: true })
  seoImage: string | null;

  @Column({ type: 'text', default: StudentArticleStatus.PENDING })
  status: StudentArticleStatus;

  @Column({ type: 'int', nullable: true })
  publishedPostId: number | null;

  @Column({ type: 'datetime', nullable: true })
  approvedAt: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
