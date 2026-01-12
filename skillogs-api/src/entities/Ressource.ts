import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum TypeRessource {
  CAS_CONCRET = 'CAS_CONCRET',
  GUIDE_METIER = 'GUIDE_METIER',
  LIVRE_BLANC = 'LIVRE_BLANC',
}

@Entity()
export class Ressource {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  titre!: string;

  @Column({
    type: 'enum',
    enum: TypeRessource,
  })
  type!: TypeRessource;

  @Column()
  urlFichier!: string;

  @CreateDateColumn()
  datePublication!: Date;
}