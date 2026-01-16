import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Index
} from 'typeorm';
import { User } from './User';
import { Resource } from './Resource';

import { InstitutionType } from '../enums/InstitutionType';

@Index(['slug'], { unique: true })
@Entity()
export class Institution {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({
    type: 'enum',
    enum: InstitutionType,
  })
  type!: InstitutionType;

  @Column()
  slug!: string;

  @Column()
  address!: string;

  @Column()
  city!: string;

  @Column()
  postal_code!: string;

  // Relations

  @OneToMany(() => User, (user) => user.institution)
  users!: User[];

  @OneToMany(() => Resource, (resource) => resource.institution)
  resources!: Resource[];
}
