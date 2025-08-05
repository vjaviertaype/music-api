import { Body, Controller, Post, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Public } from './decorators/public.decorator';
import { Roles } from './decorators/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Public()
  @Post('login')
  signIn(@Body() payload: LoginDto) {
    return this.auth.signIn(payload);
  }

  @Public()
  @Post('register')
  signUp(@Body() payload: RegisterDto) {
    return this.auth.signUp(payload);
  }

  @Roles('ADMIN', 'USER', 'ARTIST')
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
