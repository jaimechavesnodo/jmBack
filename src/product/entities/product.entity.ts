import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('productsJM')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  imageUrl: string;

  @Column()
  pointsValue: string;

  @Column()
  idRedeemable: number;

  @Column()
  amount: string;

}

