import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from './User';

@Entity()
export class ArticleBlog {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  titre!: string;

  @Column('text')
  contenu!: string;

  @CreateDateColumn()
  datePublication!: Date;

  // Relations
  @ManyToOne(() => User, (user) => user.articles)
  auteur!: User;
}
