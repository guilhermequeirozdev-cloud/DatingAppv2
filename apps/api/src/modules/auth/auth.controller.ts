import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Role } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('register')
  register(@Body() body: { name: string; email: string; password: string; role?: Role }) {
    return this.auth.register({
      name: body.name,
      email: body.email,
      password: body.password,
      role: body.role || Role.BUYER,
    });
  }

  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    return this.auth.login(body.email, body.password);
  }

  @Get('demo')
  demo() {
    return this.auth.demoUsers();
  }
}
