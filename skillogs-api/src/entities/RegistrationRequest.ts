import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from './User';

import { RequestStatus } from '../enums/RequestStatus';

@Entity()
export class RegistrationRequest {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'enum', enum: RequestStatus })
  status!: RequestStatus;

  @CreateDateColumn()
  requested_at!: Date;

  @Column({ nullable: true })
  validated_at!: Date;

  @ManyToOne(() => User, (user) => user.registration_requests)
  user!: User;
}