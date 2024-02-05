import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Ticket } from "src/ticket/entities/ticket.entity";
import { User } from "src/users/entities/user.entity";

@Module({
    imports: [TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5433,
        username: 'postgres',
        password: '1234',
        database: 'NestDB',
        entities:[User, Ticket], 
        synchronize: true
    })]
})

export class DatabaseModule{}