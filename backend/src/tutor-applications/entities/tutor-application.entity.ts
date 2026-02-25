import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum TutorApplicationStatus {
  PENDING = 'pending',
  REVIEWED = 'reviewed',
  SHORTLISTED = 'shortlisted',
  REJECTED = 'rejected',
  HIRED = 'hired',
}

@Entity('tutor_applications')
export class TutorApplication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 140 })
  fullName: string;

  @Column({ length: 180 })
  email: string;

  @Column({ length: 50 })
  phone: string;

  @Column({ length: 100 })
  city: string;

  @Column({ length: 120 })
  teachingMode: string;

  @Column({ length: 220 })
  subjects: string;

  @Column({ length: 160 })
  experience: string;

  @Column({ length: 160 })
  availability: string;

  @Column({ type: 'text' })
  coverMessage: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  resumeUrl: string | null;

  @Column({ type: 'text', default: TutorApplicationStatus.PENDING })
  status: TutorApplicationStatus;

  @Column({ type: 'text', nullable: true })
  adminNotes: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
