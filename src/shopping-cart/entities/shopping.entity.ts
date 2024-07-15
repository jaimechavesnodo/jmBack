import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('shoppingCartJM')
export class ShoppingCart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idProduct: number;

  @Column()
  redeemedAmount: number;
  
  @Column('decimal', { precision: 10, scale: 2 })
  pointsProduct: number;

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;
  
  @Column()
  idUser: number; 
}
