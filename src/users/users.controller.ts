import { Controller, Get, Put, Delete, Post, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './Dto/update-user.dto';
import { CreateUserDto } from './Dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.usersService.findOne(uuid);
  }

  @Put(':uuid')
  update(@Param('uuid') uuid: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(uuid, dto);
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.usersService.softDelete(uuid);
  }

  @Get(':uuid/favorites')
  getFavorites(@Param('uuid') uuid: string) {
    return this.usersService.getFavorites(uuid);
  }

  @Post(':uuid/favorites/:legendId')
  addFavorite(@Param('uuid') uuid: string, @Param('legendId') legendId: string) {
    return this.usersService.addFavorite(uuid, legendId);
  }

  @Delete(':uuid/favorites/:legendId')
  removeFavorite(
    @Param('uuid') uuid: string,
    @Param('legendId') legendId: string,
  ) {
    return this.usersService.removeFavorite(uuid, legendId);
  }
}
