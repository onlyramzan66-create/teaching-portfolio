import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('posts')
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  title: string;

  @Column({ unique: true, length: 220 })
  slug: string;

  @Column({ type: 'text', default: '' })
  excerpt: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  featureImage: string | null;

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

  @Column({ type: 'boolean', default: true })
  isPublished: boolean;

  @Column({ type: 'datetime', nullable: true })
  publishedAt: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
