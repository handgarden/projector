import {
  Body,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from 'src/lib/auth/decorator/LocalAuth.guard';
import { ApiController } from 'src/common/decorator/ApiController';
import { RegisterRequestDto } from '../dto/RegisterRequest.dto';
import { RestTemplate } from 'src/common/response/RestTemplate';
import { Authorized } from 'src/lib/auth/decorator/Authorized.decorator';
import { CurrentUser } from '../../../lib/auth/decorator/CurrentUser.decorator';
import { TokenUser } from '../../../lib/auth/types/TokenUser';
import { CustomError } from '../../../common/filter/error/CustomError';
import { OAuthProvider } from '../../../core/entity/enum/OAuthProvider';
import { CustomEnumPipe } from '../../../common/pipe/CustomEnum.pipe';
import { AuthMutateUseCase } from '../../application/port/in/AuthMutateUseCase';
import { LoginResponseDto } from '../dto/LoginResponse.dto';
import { AuthUserDto } from '../../application/dto/AuthUser.dto';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from '../../../lib/auth/types/TokenPayload';
import { OAuthUserProfileMutateUseCase } from '../../application/port/in/OAuthUserProfileMutateUseCase';
import { OAuthRequestDto } from '../../application/dto/OAuthRequest.dto';

@ApiController('auth')
export class AuthController {
  constructor(
    private readonly authMutateUseCase: AuthMutateUseCase,
    private readonly oauthUserProfileMutateUseCase: OAuthUserProfileMutateUseCase,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() registerDto: RegisterRequestDto,
  ): Promise<RestTemplate<null>> {
    await this.authMutateUseCase.register(registerDto);
    return RestTemplate.OK();
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<RestTemplate<LoginResponseDto>> {
    const user = req.user as AuthUserDto;
    const tokenPayload: TokenPayload = {
      sub: user.id.toString(),
      account: user.account,
    };
    const token = this.jwtService.sign(tokenPayload);
    const response = new LoginResponseDto(token);
    return RestTemplate.OK_WITH_DATA(response);
  }

  @Authorized()
  @Post('access')
  async tokenLogin(): Promise<RestTemplate<null>> {
    return RestTemplate.OK();
  }

  @Post('oauth/login')
  async githubLogin(
    @Query('provider', new CustomEnumPipe(OAuthProvider))
    provider: OAuthProvider,
    @Query('code') code: string,
  ) {
    try {
      const oauthDto = new OAuthRequestDto(provider, code);
      const loginResponse =
        await this.oauthUserProfileMutateUseCase.loginWithOAuthProfile(
          oauthDto,
        );
      return RestTemplate.OK_WITH_DATA(loginResponse);
    } catch (e) {
      if (e instanceof CustomError) {
        throw new UnauthorizedException(e.message);
      }
      throw e;
    }
  }

  @Authorized()
  @Post('oauth/register')
  async githubRegister(
    @CurrentUser() user: TokenUser,
    @Query('provider', new CustomEnumPipe(OAuthProvider))
    provider: OAuthProvider,
    @Query('code') code: string,
  ) {
    const oauthRequest = new OAuthRequestDto(provider, code);
    await this.oauthUserProfileMutateUseCase.linkOAuthProfile(
      user.id,
      oauthRequest,
    );
    return RestTemplate.OK();
  }

  @Authorized()
  @Post('oauth/unregister')
  async githubUnregister(
    @CurrentUser() user: TokenUser,
    @Query('provider', new CustomEnumPipe(OAuthProvider))
    provider: OAuthProvider,
  ) {
    await this.oauthUserProfileMutateUseCase.unlinkOAuthProfile(
      user.id,
      provider,
    );
    return RestTemplate.OK();
  }
}
