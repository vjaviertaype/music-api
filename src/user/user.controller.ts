import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'auth/decorators/roles.decorator';
import { Public } from 'auth/decorators/public.decorator';
import { GetUser } from 'auth/decorators/get-user.decorator';

import { UpdatePasswordDto } from './dto/update-password.dto';
import { JwtUser } from 'auth/interfaces/user-request.interface';
import { Prisma } from '@prisma/client';

@Public()
@Controller('user')
export class UserController {
  constructor(private readonly user: UserService) {}

  @Roles('ADMIN')
  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.user.create(payload);
  }

  @Get()
  findAll(@Query() filters: Prisma.UserFindUniqueArgs) {
    return this.user.findAll(filters);
  }

  @Get(':id')
  findOnebyId(@Param('id') id: string) {
    return this.user.findOne({ omit: { password: true }, where: { id } });
  }

  @Get(':email')
  findOneByEmail(@Param('email') email: string) {
    return this.user.findOne({ omit: { password: true }, where: { email } });
  }

  @Roles('ADMIN')
  @Patch(':id')
  update(@Param('id') id: string, @Body() payload: UpdateUserDto) {
    return this.user.update(id, payload);
  }

  @Patch('me')
  updateMe(@GetUser() user: JwtUser, @Body() payload: UpdateUserDto) {
    return this.user.update(user.id, payload);
  }

  @Roles('ADMIN', 'USER', 'ARTIST')
  @Patch('me/change-password')
  updateMePassword(
    @GetUser() user: JwtUser,
    @Body() payload: UpdatePasswordDto,
  ) {
    return this.user.updatePassword(user.id, payload);
  }

  @Roles('ADMIN')
  @Patch(':id/change-password')
  updatePassword(@Param('id') id: string, @Body() payload: UpdatePasswordDto) {
    return this.user.updatePassword(id, payload);
  }

  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.user.remove(id);
  }
}
