import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { User } from './User';
import { Formation } from './Formation';
import { Temoignage } from './Temoignage';

import { TypeEtablissement } from '../enums/TypeEtablissement';

@Entity()
export class Etablissement {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nom!: string;

  @Column({
    type: 'enum',
    enum: TypeEtablissement,
  })
  type!: TypeEtablissement;

  @Column()
  ville!: string;

  // Relations
  @OneToMany(() => User, (user) => user.etablissement)
  users!: User[];

  @OneToMany(() => Formation, (formation) => formation.etablissement)
  formations!: Formation[];

  @OneToMany(() => Temoignage, (temoignage) => temoignage.etablissement)
  temoignages!: Temoignage[];
}
