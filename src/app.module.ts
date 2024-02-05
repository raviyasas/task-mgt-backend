import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { TicketModule } from './ticket/ticket.module';
import { Ticket } from './ticket/entities/ticket.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([User, Ticket]), UsersModule, TicketModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
