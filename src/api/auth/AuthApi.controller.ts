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
import { AuthService } from 'src/lib/auth/Auth.service';
import { LocalAuthGuard } from 'src/lib/auth/decorator/LocalAuth.guard';
import { ApiController } from 'src/common/decorator/ApiController';
import { RegisterRequestDto } from './dto/RegisterRequest.dto';
import { RestTemplate } from 'src/common/response/RestTemplate';
import { Authorized } from 'src/lib/auth/decorator/Authorized.decorator';
import { CurrentUser } from '../../lib/auth/decorator/CurrentUser.decorator';
import { TokenUser } from '../../lib/auth/types/TokenUser';
import { CustomError } from '../../common/filter/error/CustomError';
import { OAuthFacadeService } from '../../lib/auth/oauth/OAuthFacade.service';
import { OAuthProvider } from '../../core/entity/enum/OAuthProvider';
import { CustomEnumPipe } from '../../common/pipe/CustomEnum.pipe';

@ApiController('auth')
export class AuthApiController {
  constructor(
    private readonly authService: AuthService,
    private readonly oauthService: OAuthFacadeService,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterRequestDto) {
    await this.authService.register(registerDto);
    return RestTemplate.OK();
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    const user = req.user;
    const loginResponse = await this.authService.login(user);
    return RestTemplate.OK_WITH_DATA(loginResponse);
  }

  @Authorized()
  @Post('access')
  async tokenLogin() {
    return RestTemplate.OK();
  }

  @Post('oauth/login')
  async githubLogin(
    @Query('provider', new CustomEnumPipe(OAuthProvider))
    provider: OAuthProvider,
    @Query('code') code: string,
  ) {
    const githubProfile = await this.getOAuthProfile(provider, code);
    try {
      const loginResponse = await this.authService.OAuthLogin(githubProfile);
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
    const githubProfile = await this.getOAuthProfile(provider, code);
    await this.authService.linkOAuthProfile(user.id, githubProfile);
    return RestTemplate.OK();
  }

  private async getOAuthProfile(provider: OAuthProvider, code: string) {
    try {
      const githubToken = await this.oauthService.getToken(provider, code);
      const githubProfile = await this.oauthService.getProfile(
        provider,
        githubToken.accessToken,
      );
      return githubProfile;
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException();
    }
  }
}
