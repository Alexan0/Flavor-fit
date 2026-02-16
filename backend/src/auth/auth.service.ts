import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@prisma/prisma.service';
import { AuthInput } from './inputs/auth.input';
import { hash, verify } from 'argon2';
import { TAuthTokenData } from './auth.interface';
import { UsersService } from '@users/users.service';
import type { Response } from 'express';
import { isDev } from '@utils/is-dev.util';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
    private jwt: JwtService,
    private usersService: UsersService,
  ) {}

  private EXPIRE_DAT_REFRESH_TOKEN = 3;
  REFRESH_TOKEN_NAME = 'refreshToken';

  async register(input: AuthInput) {
    const email = input.email.toLowerCase();
    const existingUser = await this.prisma.user.findFirst({
      where: {
        email: { equals: email, mode: 'insensitive' },
      },
    });

    if (existingUser) {
      throw new BadRequestException('User with this email already exist');
    }

    const user = await this.prisma.user.create({
      data: {
        ...input,
        password: await hash(input.password),
      },
    });

    const tokens = this.generateTokens({ id: user.id, role: user.role });

    return { user, ...tokens };
  }

  async login(input: AuthInput) {
    const user = await this.validateUser(input);
    const tokens = this.generateTokens({ id: user.id, role: user.role });

    return { user, ...tokens };
  }

  async getNewTokens(refreshToken: string) {
    const result =
      await this.jwt.verifyAsync<Pick<TAuthTokenData, 'id'>>(refreshToken);

    if (!result) {
      throw new BadRequestException('Invalid refresh token');
    }

    const user = await this.usersService.getById(result.id);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const tokens = this.generateTokens({
      id: user.id,
      role: user.role,
    });

    return { user, ...tokens };
  }

  private async validateUser(input: AuthInput) {
    const email = input.email.toLowerCase();
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('Invalid email or password');
    }

    const isPasswordValid = await verify(user.password, input.password);

    if (!isPasswordValid) {
      throw new NotFoundException('Invalid email or password');
    }

    return user;
  }

  private generateTokens(data: TAuthTokenData) {
    const accessToken = this.jwt.sign(data, {
      expiresIn: '1h',
    });

    const refreshToken = this.jwt.sign(
      { id: data.id },
      {
        expiresIn: `${this.EXPIRE_DAT_REFRESH_TOKEN}d`,
      },
    );

    return { accessToken, refreshToken };
  }

  toggleRefreshTokenCookie(response: Response, token: string | null) {
    const isRemoveCookie = !token;
    const expiresIn = isRemoveCookie
      ? new Date(0)
      : new Date(
          Date.now() + this.EXPIRE_DAT_REFRESH_TOKEN * 24 * 60 * 60 * 1000,
        );

    return response.cookie(this.REFRESH_TOKEN_NAME, token, {
      httpOnly: true,
      domain: 'localhost',
      secure: true,
      sameSite: isDev(this.configService) ? 'none' : 'strict',
      expires: expiresIn,
    });
  }
}
