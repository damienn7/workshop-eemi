import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Module } from './Module';
import { Media } from './Media';

import { TypeLecon } from '../enums/TypeLecon';

@Entity()
export class Lecon {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  titre!: string;

  @Column({
    type: 'enum',
    enum: TypeLecon,
  })
  type!: TypeLecon;

  // Relations
  @ManyToOne(() => Module, (module) => module.lecons)
  module!: Module;

  @OneToMany(() => Media, (media) => media.lecon)
  medias!: Media[];
}
