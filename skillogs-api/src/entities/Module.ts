import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Formation } from './Formation';
import { Lecon } from './Lecon';

@Entity()
export class Module {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  titre!: string;

  @Column()
  ordre!: number;

  // Relations
  @ManyToOne(() => Formation, (formation) => formation.modules)
  formation!: Formation;

  @OneToMany(() => Lecon, (lecon) => lecon.module)
  lecons!: Lecon[];
}