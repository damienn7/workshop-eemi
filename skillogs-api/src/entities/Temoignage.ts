import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Etablissement } from './Etablissement';

@Entity()
export class Temoignage {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  auteur!: string;

  @Column('text')
  contenu!: string;

  @Column()
  note!: number;

  // Relations
  @ManyToOne(() => Etablissement, (etab) => etab.temoignages)
  etablissement!: Etablissement;
}
