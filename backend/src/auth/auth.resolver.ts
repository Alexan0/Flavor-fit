import { Args, Context, Mutation, Resolver, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthInput } from './inputs/auth.input';
import { AuthResponse } from './auth.interface';
import { type IGqlContext } from 'src/app.interface';
import { BadRequestException } from '@nestjs/common';
import { VerifyCaptcha } from './decorators/captcha.decorator';
import { AuthAccountService } from './auth-account.service';
import { AuthTokenService } from './auth-token.service';
import { RequestPasswordResetInput } from './inputs/reset-password-request.input';
import { ResetPasswordInput } from './inputs/reset-password.input';

@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private authAccountService: AuthAccountService,
    private authTokenService: AuthTokenService,
  ) {}

  @Mutation(() => AuthResponse)
  @VerifyCaptcha()
  async login(@Args('data') input: AuthInput, @Context() { res }: IGqlContext) {
    const { refreshToken, accessToken, ...response } =
      await this.authService.login(input);

    this.authTokenService.toggleAccessTokenCookie(res, accessToken);
    this.authTokenService.toggleRefreshTokenCookie(res, refreshToken);

    return response;
  }

  @Mutation(() => AuthResponse)
  @VerifyCaptcha()
  async register(
    @Args('data') input: AuthInput,
    @Context() { res }: IGqlContext,
  ) {
    const { refreshToken, accessToken, ...response } =
      await this.authService.register(input);

    this.authTokenService.toggleAccessTokenCookie(res, accessToken);
    this.authTokenService.toggleRefreshTokenCookie(res, refreshToken);

    return response;
  }

  @Query(() => AuthResponse)
  async newTokens(@Context() { req, res }: IGqlContext) {
    const initialRefreshToken =
      req.cookies?.[this.authTokenService.REFRESH_TOKEN_NAME];

    if (!initialRefreshToken) {
      this.authTokenService.toggleAccessTokenCookie(res, null);
      this.authTokenService.toggleRefreshTokenCookie(res, null);
      throw new BadRequestException('Refresh this token is missing');
    }

    const { refreshToken, accessToken, ...response } =
      await this.authTokenService.getNewTokens(initialRefreshToken);

    this.authTokenService.toggleAccessTokenCookie(res, accessToken);
    this.authTokenService.toggleRefreshTokenCookie(res, refreshToken);

    return response;
  }

  @Mutation(() => Boolean)
  async verifyEmail(@Args('token', { type: () => String }) token: string) {
    return this.authAccountService.verifyEmail(token);
  }

  @Mutation(() => Boolean)
  @VerifyCaptcha()
  async requestPasswordReset(@Args('data') input: RequestPasswordResetInput) {
    return this.authAccountService.requestPasswordReset(input.email);
  }

  @Mutation(() => Boolean)
  @VerifyCaptcha()
  async resetPassword(@Args('data') input: ResetPasswordInput) {
    return this.authAccountService.resetPassword(
      input.token,
      input.newPassword,
    );
  }

  @Mutation(() => Boolean)
  logout(@Context() { res, req }: IGqlContext) {
    const initialRefreshToken =
      req.cookies?.[this.authTokenService.REFRESH_TOKEN_NAME];

    this.authTokenService.toggleAccessTokenCookie(res, null);
    this.authTokenService.toggleRefreshTokenCookie(res, null);

    if (!initialRefreshToken) {
      throw new BadRequestException('Refresh this token is missing');
    }

    return true;
  }
}
