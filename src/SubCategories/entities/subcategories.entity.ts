import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('redeemableJM')
export class SubcategoriesCatalogo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  imageUrl: string;

  @Column()
  idcategories: number;

  @Column()
  redeemable: string;

  @Column()
  description: string

  @Column()
  pointsValue: string

}

