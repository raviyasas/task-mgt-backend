import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Ticket {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    status: string;

    @Column({default: false})
    approved: boolean;


    // @Column()
    // createdDate: Date;
 
    // @Column()
    // upcatedDate: Date;

    @ManyToOne(() => User, (user) => user.tickets)
    @JoinColumn({name: 'userId'})
    user: User;
}
