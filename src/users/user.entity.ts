import {Entity, PrimaryGeneratedColumn, Column,AfterInsert, AfterUpdate} from "typeorm";
// import{Exclude} from 'class-transformer';

@Entity() 
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    // @Column()
    // username: string;
    @Column()
    //@Exclude() there is a better way to do this
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