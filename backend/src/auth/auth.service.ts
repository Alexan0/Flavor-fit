import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@prisma/prisma.service';
import { AuthInput } from './inputs/auth.input';
import { hash, verify } from 'argon2';
import { UsersService } from '@users/users.service';
import { generateToken } from '@utils/generate-token.util';
import { EmailService } from '@email/email.service';
import { AuthTokenService } from './auth-token.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
    private usersService: UsersService,
    private emailService: EmailService,
    private authTokenService: AuthTokenService,
  ) {}

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

    const emailVerificationToken = generateToken();

    const user = await this.prisma.user.create({
      data: {
        ...input,
        password: await hash(input.password),
        emailVerificationToken,
        emailVerificationTokenExpiresAt: new Date(Date.now() + 1000 * 60 * 60),
      },
    });

    const tokens = this.authTokenService.generateTokens({
      id: user.id,
      role: user.role,
    });
    const verificationUrl = `${this.configService.get('CLIENT_URL' as string)}/verify-email?token=${emailVerificationToken}`;

    await this.emailService.sendVerificationEmail(user.email, verificationUrl);

    return { user, ...tokens };
  }

  async login(input: AuthInput) {
    const user = await this.validateUser(input);
    const tokens = this.authTokenService.generateTokens({
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
}
