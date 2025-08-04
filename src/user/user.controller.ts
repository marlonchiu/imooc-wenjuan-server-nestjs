import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
  Get,
  Redirect,
} from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto } from './dto/create_user.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('register')
  async register(@Body() createUserDto: createUserDto) {
    try {
      return this.userService.create(createUserDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('info')
  @Redirect('/api/auth/profile', 302) // http状态码 GET请求 - 301永久 302临时
  async info() {
    return;
  }

  @Public()
  @Post('login')
  @Redirect('/api/auth/login', 307) // http状态码 POST请求 - 308永久 307临时
  async login() {
    return;
  }
}
