import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { hash } from 'argon2';
import type { Prisma } from 'prisma/generated/prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import { UserUpdateInput } from './inputs/user-update.input';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return this.prisma.user.findMany();
  }

  async getById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        measurements: true,
        profile: true,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: 'insensitive',
        },
      },
    });
  }

  async updateProfile(id: string, input: UserUpdateInput) {
    const user = await this.getById(id);

    if (!user) {
      throw new BadRequestException('User is not defined');
    }

    const { profile, measurements, password, email } = input;

    if (user.email === email) {
      throw new ConflictException('Пользователь с таким email уже существует');
    }

    const updateData: Prisma.UserUpdateInput = {};

    if (email) {
      updateData.email = email;
    }

    if (profile) {
      updateData.profile = {
        upsert: {
          create: profile as Prisma.ProfileCreateWithoutUserInput,
          update: profile,
        },
      };
    }

    if (measurements) {
      updateData.measurements = {
        upsert: {
          create: measurements,
          update: measurements,
        },
      };
    }

    const hashedPassword =
      password && typeof password === 'string'
        ? {
            password: await hash(password),
          }
        : {};

    return this.prisma.user.update({
      where: { id },

      data: {
        ...hashedPassword,
        ...updateData,
      },
      include: {
        measurements: true,
        profile: true,
      },
    });
  }
}
