import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
@Entity()
export class Report {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    price: number;
    
}