import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('customerPointsJM')
export class pointClient {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('decimal', { precision: 10, scale: 2 })
    pointsCurrent: number;

    @Column('decimal', { precision: 10, scale: 2 })
    PointsAccumulatedPreviousMonth: number;

    @Column('decimal', { precision: 10, scale: 2 })
    pointsToExpire: number;

    @Column()
    idUser: number;

}