import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { UserRole } from '../enums/UserRole';
import { AccountStatus } from '../enums/AccountStatus';
import { Etablissement } from './Etablissement';
import { Inscription } from './Inscription';
import { ArticleBlog } from './ArticleBlog';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  /**
   * Identifiant national (CIN)
   * → utilisé comme identifiant métier
   * → PAS clé primaire (bonne pratique)
   */
  @Column({ unique: true })
  cin!: string;

  @Column()
  prenom!: string;

  @Column()
  nom!: string;

  @Column({ unique: true })
  email!: string;

  /**
   * Hash bcrypt
   */
  @Column()
  password_hash!: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.APPRENANT,
  })
  role!: UserRole;

  @Column({
    type: 'enum',
    enum: AccountStatus,
    default: AccountStatus.PENDING,
  })
  status!: AccountStatus;

  @CreateDateColumn()
  dateCreation!: Date;

  /**
   * Relations
   */

  // Un utilisateur appartient à un établissement
  @ManyToOne(() => Etablissement, (etab) => etab.users, {
    nullable: false,
  })
  etablissement!: Etablissement;

  // Un utilisateur peut avoir plusieurs inscriptions
  @OneToMany(() => Inscription, (inscription) => inscription.user)
  inscriptions!: Inscription[];

  // Un utilisateur (formateur / admin) peut rédiger des articles
  @OneToMany(() => ArticleBlog, (article) => article.auteur)
  articles!: ArticleBlog[];
}
