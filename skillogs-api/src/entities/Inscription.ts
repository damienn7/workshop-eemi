import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from './User';
import { Formation } from './Formation';

@Entity()
export class Inscription {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('float')
  progression!: number;

  @CreateDateColumn()
  dateInscription!: Date;

  // Relations
  @ManyToOne(() => User, (user) => user.inscriptions)
  user!: User;

  @ManyToOne(() => Formation, (formation) => formation.inscriptions)
  formation!: Formation;
}
