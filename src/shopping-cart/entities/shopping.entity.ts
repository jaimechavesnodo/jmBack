import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('shoppingCartJM')
export class ShoppingCart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idProduct: string;

  @Column()
  redeemedAmount: number;

  @Column()
  points: string;

  @Column()
  total: string;

}
