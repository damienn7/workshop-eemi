import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { User } from './User';
import { Resource } from './Resource';

import { InstitutionType } from '../enums/InstitutionType';

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

  @Column({ unique: true })
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
