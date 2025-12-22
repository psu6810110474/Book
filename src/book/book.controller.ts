import { CreateBookDto } from './dto/create-book.dto';
import { RolesGuard } from '../auth/roles.guard'; 
import { Roles } from '../auth/roles.decorator'; 
import { UserRole } from '../users/entities/user.entity'; 
import { AuthGuard } from '@nestjs/passport'; 
import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
 
@Controller('book') 
export class BookController { 
  constructor(private readonly bookService: BookService) {} 
// Public: ใครก็ดูรายการหนังสือได้ 
  @Get() 
  findAll() { 
    return this.bookService.findAll();
  }
// Admin Only: สร้างหนังสือได้เฉพาะ Admin 

  @UseGuards(AuthGuard('jwt'), RolesGuard) 
  @Roles(UserRole.ADMIN) 
  @Post() 
    create(@Body() createBookDto: CreateBookDto) { 
    return this.bookService.create(createBookDto);
  }
} // ปิด