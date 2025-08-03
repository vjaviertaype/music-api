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
import { FindAllUsersDto } from './dto/find-all-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.userService.create(payload);
  }

  @Get()
  findAll(@Query() filters: FindAllUsersDto) {
    return this.userService.findAll(filters);
  }

  @Get(':id')
  findOnebyId(@Param('id') id: string) {
    return this.userService.findOne({ uniqueFilter: { id } });
  }

  @Get(':email')
  findOneByEmail(@Param('email') email: string) {
    return this.userService.findOne({ uniqueFilter: { email } });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() payload: UpdateUserDto) {
    return this.userService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
