import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class MessageContact {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nom!: string;

  @Column()
  email!: string;

  @Column()
  etablissement!: string;

  @Column('text')
  message!: string;

  @CreateDateColumn()
  dateEnvoi!: Date;
}
