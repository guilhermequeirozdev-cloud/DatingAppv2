import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async register(data: { name: string; email: string; password: string; role: Role }) {
    const user = await this.prisma.user.create({ data });
    return this.signUser(user);
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || user.password !== password) {
      return { error: 'Credenciais inválidas' };
    }
    return this.signUser(user);
  }

  private signUser(user: { id: string; email: string; role: Role; name: string }) {
    const token = this.jwt.sign({ sub: user.id, role: user.role, email: user.email });
    return { token, user };
  }
}
