import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('customerRedemptionsJM')
export class CustomerRedemptions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderName: string;

  @Column()
  redemptionDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  pointsProduct: number;

  @Column()
  idUser: number;

  @Column()
  redeemedAmount: number;

}

