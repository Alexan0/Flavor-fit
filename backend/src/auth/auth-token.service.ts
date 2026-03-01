import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TAuthTokenData } from './auth.interface';
import type { Response } from 'express';
import { isDev } from '@utils/is-dev.util';
import { UsersService } from '@users/users.service';

@Injectable()
export class AuthTokenService {
  constructor(
    private configService: ConfigService,
    private jwt: JwtService,
    private usersService: UsersService,
  ) {}

  private readonly EXPIRE_HOURS_ACCESS_TOKEN = 1;
  readonly ACCESS_TOKEN_NAME = 'accessToken' as const;

  private readonly EXPIRE_DAYS_REFRESH_TOKEN = 3;
  readonly REFRESH_TOKEN_NAME = 'refreshToken' as const;

  toggleAccessTokenCookie(res: Response, token: string | null) {
    this.toggleAuthTokenCookie({
      response: res,
      name: this.ACCESS_TOKEN_NAME,
      token,
      expires: new Date(Date.now() + this.EXPIRE_HOURS_ACCESS_TOKEN * 3600000),
    });
  }

  toggleRefreshTokenCookie(res: Response, token: string | null) {
    this.toggleAuthTokenCookie({
      response: res,
      name: this.REFRESH_TOKEN_NAME,
      token,
      expires: new Date(
        Date.now() + this.EXPIRE_DAYS_REFRESH_TOKEN * 24 * 60 * 60 * 1000,
      ),
    });
  }

  generateTokens(data: TAuthTokenData) {
    const accessToken = this.jwt.sign(data, {
      expiresIn: '1h',
    });

    const refreshToken = this.jwt.sign(
      { id: data.id },
      {
        expiresIn: `${this.EXPIRE_DAYS_REFRESH_TOKEN}d`,
      },
    );

    return { accessToken, refreshToken };
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

  private toggleAuthTokenCookie({
    response,
    name,
    token,
    expires,
  }: {
    response: Response;
    name:
      | AuthTokenService['ACCESS_TOKEN_NAME']
      | AuthTokenService['REFRESH_TOKEN_NAME'];
    token: string | null;
    expires: Date;
  }) {
    const isRemoveCookie = !token;
    const expiresIn = isRemoveCookie ? new Date(0) : expires;

    return response.cookie(name, token, {
      httpOnly: true,
      domain: 'localhost',
      secure: true,
      sameSite: isDev(this.configService) ? 'none' : 'strict',
      expires: expiresIn,
    });
  }
}
