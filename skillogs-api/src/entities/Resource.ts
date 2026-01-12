import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from './User';
import { Institution } from './Institution';

@Entity()
export class Resource {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  type!: string;

  @Column()
  url!: string;

  @CreateDateColumn()
  published_at!: Date;

  // Relations

  @ManyToOne(() => User, (user) => user.resources)
  author!: User;

  @ManyToOne(() => Institution, (institution) => institution.resources)
  institution!: Institution;
}
