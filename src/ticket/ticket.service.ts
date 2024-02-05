import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TicketService {

  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>
  ) { }

  async create(createTicketDto: CreateTicketDto, user: User) {
    const ticket = await this.ticketRepository.create(createTicketDto);
    ticket.user = user;
    return this.ticketRepository.save(ticket);
  }

  async approve(id: string) {
    const ticket = await this.ticketRepository.findOne(
      {
        where: { id: parseInt(id) }
      }
    );

    if (!ticket) {
      throw new NotFoundException('Ticket cannot be found');
    }

    ticket.approved = true;
    return this.ticketRepository.save(ticket);
  }

  async reject(id: string) {
    const ticket = await this.ticketRepository.findOne(
      {
        where: { id: parseInt(id) }
      }
    );

    if (!ticket) {
      throw new NotFoundException('Ticket cannot be found');
    }

    ticket.approved = false;
    return this.ticketRepository.save(ticket);
  }

  async findAll() {
    return await this.ticketRepository.find();
  }

  async findOne(id: string) {
    const ticket = await this.ticketRepository.findOne(
      {
        where: { id: parseInt(id) }
      }
    );
    return ticket;

  }

  async update(id: string, updateTicketDto: UpdateTicketDto) {
    const ticket = await this.ticketRepository.findOne(
      {
        where: { id: parseInt(id) }
      }
    );

    if (!ticket) {
      throw new NotFoundException('Ticket cannot be found');
    }

    ticket.name = updateTicketDto.name;
    ticket.description = updateTicketDto.description;
    ticket.status = updateTicketDto.status;

    return await this.ticketRepository.save(ticket);
  }

  async remove(id: number) {
    return await this.ticketRepository.delete(id);
  }
}
