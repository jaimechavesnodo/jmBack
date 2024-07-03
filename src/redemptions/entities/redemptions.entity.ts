import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('customerRedemptionsJM')
export class CustomerRedemptions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderName: string;

  @Column()
  redemptionDate: Date;

  @Column()
  points: string;

}

