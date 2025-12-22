import { UserRole } from '../entities/user.entity'; // ถ้ามีการใช้ Role

export class CreateUserDto {
  email: string;
  password: string; //
  role?: UserRole; // ถ้าต้องการให้ส่ง role มาได้ด้วย
}