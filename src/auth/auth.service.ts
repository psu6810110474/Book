import { Injectable, UnauthorizedException, Optional } from '@nestjs/common'; 
import { UsersService } from '../users/users.service'; 
import { JwtService } from '@nestjs/jwt'; 
import * as bcrypt from 'bcrypt'; 
 
@Injectable() 
export class AuthService { 
  constructor( 
    @Optional() private usersService?: UsersService, 
    @Optional() private jwtService?: JwtService, 
  ) {} 
 
  // ตรวจสอบ Email และ Password 
  async validateUser(email: string, pass: string): Promise<any> { 
    if (!this.usersService) return null;
    const user = await this.usersService.findOneByEmail(email); 
    if (user && (await bcrypt.compare(pass, user.password))) { 
      const { password, ...result } = user; 
      return result; 
    } 
    return null; 
  } 
 
  // สร้าง Token (Payload คือข้อมูลที ่จะฝังใน Token) 
  async login(user: any) { 
    if (!this.jwtService) throw new Error('JwtService not available');
    const payload = { username: user.email, sub: user.id, role: user.role }; 
    return { 
      access_token: this.jwtService.sign(payload), 
    }; 
  } 
}
