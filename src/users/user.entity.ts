import {Entity, PrimaryGeneratedColumn, Column,AfterInsert, AfterUpdate} from "typeorm";

@Entity() 
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    username: string;
    @Column()
    password: string;
    @Column()
    email: string;
    @AfterInsert()
    logInsert() {
        console.log("Inserted user with id: ", this.id);
    }
    @AfterUpdate()
    logUpdate() {
        console.log("Updated user with id: ", this.id);
    }
    
}