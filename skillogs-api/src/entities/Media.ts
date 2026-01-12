import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Lecon } from './Lecon';

export enum TypeMedia {
  VIDEO = 'VIDEO',
  PDF = 'PDF',
  IMAGE = 'IMAGE',
}

@Entity()
export class Media {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'enum',
    enum: TypeMedia,
  })
  type!: TypeMedia;

  @Column()
  url!: string;

  /**
   * Durée en secondes (pour VIDEO)
   * null pour PDF / IMAGE
   */
  @Column({ nullable: true })
  duree!: number | null;

  // Relations
  @ManyToOne(() => Lecon, (lecon) => lecon.medias)
  lecon!: Lecon;
}