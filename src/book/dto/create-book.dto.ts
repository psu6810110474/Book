// src/book/dto/create-book.dto.ts

import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateBookDto {
  
  // ส่วนที่ต้องเก็บไว้ (โครงสร้างหนังสือ)
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  // --- ส่วนที่ลบออกไปแล้ว (Email, Password, Role) ---
}