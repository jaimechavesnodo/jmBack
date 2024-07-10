import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('redeemableJM')
export class Catalogue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  imageUrl: string;

  @Column()
  idcategories: string;
  
}

