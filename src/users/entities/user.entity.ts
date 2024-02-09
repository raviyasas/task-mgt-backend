import { Ticket } from "../../ticket/entities/ticket.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({default: false})
    admin: boolean;

    @OneToMany(() => Ticket, (ticket) => ticket.user)
    tickets: Ticket[];
}
 