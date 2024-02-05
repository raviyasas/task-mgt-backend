import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { CurrentUser } from 'src/users/decorators/current-user-decorator';
import { User } from 'src/users/entities/user.entity';
import { AuthGuard } from 'src/users/guards/auth.guard';
import { ApproveTicketDto } from './dto/approve-ticket.dto';
import { AdminGuard } from 'src/users/guards/admin.guard';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  @UseGuards(AuthGuard)
  createTicket(@Body() createTicketDto: CreateTicketDto, @CurrentUser() user: User) {
    return this.ticketService.create(createTicketDto, user);
  }

  @Get()
  findAllTickets() {
    return this.ticketService.findAll();
  }

  @Get(':id')
  findOneTicket(@Param('id') id: string) {
    return this.ticketService.findOne(id);
  }

  @Patch(':id')
  updateTicket(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketService.update(id, updateTicketDto);
  }

  @Patch('/approve/:id')
  @UseGuards(AdminGuard)
  approveTicket(@Param('id') id: string) {
    return this.ticketService.approve(id);
  }

  @Patch('/reject/:id')
  @UseGuards(AdminGuard)
  rejectTicket(@Param('id') id: string) {
    return this.ticketService.reject(id);
  }

  @Delete(':id')
  removeTicket(@Param('id') id: string) {
    return this.ticketService.remove(+id);
  }
}
