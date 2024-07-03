import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('usersJM')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  idStatus: number;
  
  @Column()
  lastName: string;

  @Column()
  identification: string;

  @Column()
  phone: string;
  
  @Column()
  corporateEmail: string; 

  @Column()
  secondaryEmail: string;

  @Column()
  company: string; 

  @Column()
  birthdayDate: string;

  @Column()
  personalPhone: string; 

  @Column()
  role: string;

  @Column()
  typeDocument: string;
}

