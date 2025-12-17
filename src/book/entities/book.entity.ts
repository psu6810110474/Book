import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
// อย่าลืม Import BookCategory เข้ามาด้วยนะ!
import { BookCategory } from '../../book-category/entities/book-category.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  author: string;

  // เก็บราคาเป็นทศนิยม 2 ตำแหน่ง
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  // ยอดไลก์ เริ่มต้นเป็น 0 เสมอ
  @Column({ default: 0 })
  likeCount: number;

  // --- ส่วนเชื่อมโยง (Relationship) ---
  
  // 1. เชื่อม Object: เพื่อให้เวลาดึง Book สามารถเห็นข้อมูล Category เต็มๆ ได้
  @ManyToOne(() => BookCategory, (category) => category.id)
  category: BookCategory;

  // 2. เชื่อม ID: เพื่อให้เวลาบันทึก เราส่งแค่ categoryId มาก็พอ
  @Column({ nullable: true })
  categoryId: string;
}