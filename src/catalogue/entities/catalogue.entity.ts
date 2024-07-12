import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categoriesRedeemableJM')
export class Catalogue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

}

