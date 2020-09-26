import {
  Entity,
  PrimaryColumn,
  Column,
  Unique,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { CategoryName } from './enums/categoryName.enum';

@Entity('categories')
@Unique(['categoryName'])
export class Category {
  @PrimaryColumn()
  id: string;

  @Column()
  categoryName: CategoryName;

  @Column()
  slug: string;
}
