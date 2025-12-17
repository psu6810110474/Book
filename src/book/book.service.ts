import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {
  // 1. ส่วนสำคัญ! ต้องฉีด Repository เข้ามาก่อน ถึงจะใช้งาน Database ได้
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  // สร้างหนังสือ
  create(createBookDto: CreateBookDto) {
    // แปลง DTO เป็น Entity แล้วบันทึก
    const book = this.bookRepository.create(createBookDto);
    return this.bookRepository.save(book);
  }

  // ดึงข้อมูลทั้งหมด
  findAll() {
    // relations: ['category'] คือสั่งให้ดึงข้อมูลหมวดหมู่ติดมาด้วย (Join Table)
    return this.bookRepository.find({ relations: ['category'] });
  }

  // ดึงข้อมูลตาม ID (แก้จาก number เป็น string)
  async findOne(id: string) {
    const book = await this.bookRepository.findOne({ 
      where: { id },
      relations: ['category'] 
    });
    
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  // แก้ไขข้อมูล (แก้จาก number เป็น string)
  async update(id: string, updateBookDto: UpdateBookDto) {
    // อัปเดตข้อมูล
    await this.bookRepository.update(id, updateBookDto);
    // ส่งข้อมูลล่าสุดกลับไป
    return this.findOne(id);
  }

  // ลบข้อมูล (แก้จาก number เป็น string)
  async remove(id: string) {
    const book = await this.findOne(id); // เช็คก่อนว่ามีไหม
    return this.bookRepository.remove(book);
  }

  // ฟังก์ชันกดไลก์ (ที่คุณเขียนไว้ถูกต้องแล้วครับ แค่ขาด constructor)
  async incrementLikes(id: string) {
    const book = await this.findOne(id); // ใช้ findOne ที่เราเขียนไว้ข้างบนได้เลย
    book.likeCount += 1;
    return this.bookRepository.save(book);
  }
}