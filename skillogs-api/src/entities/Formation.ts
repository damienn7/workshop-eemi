import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Etablissement } from './Etablissement';
import { Module } from './Module';
import { Inscription } from './Inscription';

@Entity()
export class Formation {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  titre!: string;

  @Column('text')
  description!: string;

  @Column()
  niveau!: string;

  // Relations
  @ManyToOne(() => Etablissement, (etab) => etab.formations)
  etablissement!: Etablissement;

  @OneToMany(() => Module, (module) => module.formation)
  modules!: Module[];

  @OneToMany(() => Inscription, (inscription) => inscription.formation)
  inscriptions!: Inscription[];
}