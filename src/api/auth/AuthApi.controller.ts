import {
  Body,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/lib/auth/Auth.service';
import { LocalAuthGuard } from 'src/lib/auth/decorator/LocalAuth.guard';
import { ApiController } from 'src/common/decorator/ApiController';
import { RegisterRequestDto } from './dto/RegisterRequest.dto';
import { RestTemplate } from 'src/common/response/RestTemplate';
import { JwtAuthGuard } from 'src/lib/auth/decorator/JwtAuth.guard';

@ApiController('auth')
// @Controller('/api/auth')
export class AuthApiController {
  constructor(private readonly authService: AuthService) {}

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

  @UseGuards(JwtAuthGuard)
  @Post('access')
  async tokenLogin() {
    return RestTemplate.OK();
  }
}
