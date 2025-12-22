import { Controller, Post, Body, UnauthorizedException, Optional } from '@nestjs/common'; 
import { AuthService } from './auth.service'; 
 
// สร้าง Class DTO สําหรับรับค่า (ใส่ในไฟล์เดียวกันหรือแยกไฟล์ก็ได้) 
class LoginDto { 
  email: string; 
  password: string; 
} 
 
@Controller('auth') 
export class AuthController { 
  constructor(private authService?: AuthService) {} 
  @Post('login') 
  async login(@Body() body: LoginDto) {
    if (!this.authService) throw new UnauthorizedException('AuthService not available');
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }
} //