import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Institution } from './Institution';
import { RegistrationRequest } from './RegistrationRequest';
import { Training } from './Training';
import { Enrollment } from './Enrollment';
import { Resource } from './Resource';

import { Role } from '../enums/Role';

import { AccountStatus } from '../enums/AccountStatus';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true, nullable: true })
  national_id!: string | null;

  @Column()
  first_name!: string;

  @Column()
  last_name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password_hash!: string;

  @Column({ type: 'enum', enum: Role })
  role!: Role;

  @Column({ type: 'enum', enum: AccountStatus })
  status!: AccountStatus;

  @CreateDateColumn()
  created_at!: Date;

  /* Relations */

  @ManyToOne(() => Institution, (institution) => institution.users)
  institution!: Institution;

  @OneToMany(() => RegistrationRequest, (req) => req.user)
  registration_requests!: RegistrationRequest[];

  @OneToMany(() => Training, (training) => training.creator)
  trainings!: Training[];

  @OneToMany(() => Enrollment, (enrollment) => enrollment.user)
  enrollments!: Enrollment[];

  @OneToMany(() => Resource, (resource) => resource.author)
  resources!: Resource[];
}