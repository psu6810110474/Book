import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateBookCategoryDto } from './dto/create-book-category.dto';
import { UpdateBookCategoryDto } from './dto/update-book-category.dto';
import { Repository } from 'typeorm'; 
import { BookCategory } from './entities/book-category.entity';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class BookCategoryService implements OnModuleInit {  
  constructor(
    @InjectRepository(BookCategory)
    private readonly repo: Repository<BookCategory>,
) {}

async onModuleInit() { 
  const count = await this.repo.count(); 
    if (count === 0) { 
      console.log('Seeding Book Categories...'); 
      await this.repo.save([ 
        { name: 'Fiction', description: 'Stories and novels' }, 
        { name: 'Technology', description: 'Computers and engineering' }, 
        { name: 'History', description: 'Past events' } 
      ]); 
     } 
    } 


  async create(createBookCategoryDto: CreateBookCategoryDto) {
    const category = this.repo.create(createBookCategoryDto);
    return this.repo.save(category);
  }

  async findAll() {
    return this.repo.find();
  }

  async findOne(id: string) {
    return this.repo.findOneBy({ id });
  }

  async update(id: string, updateBookCategoryDto: UpdateBookCategoryDto) {
    await this.repo.update(id, updateBookCategoryDto);
    return this.repo.findOne({ where: { id } });
  }

  async remove(id: string) {
    const category = await this.repo.findOne({ where: { id } });
    await this.repo.delete(id);
    return category;
  }
}
