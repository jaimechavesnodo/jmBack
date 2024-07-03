import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('customerPointsJM')
export class pointClient {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    pointsCurrent: string;

    @Column()
    pointsAccumulated: string;

    @Column()
    pointsToExpire: string;
}