import {
  Body,
  Query,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  /* 
        GET /users
        GET /users/:id
        POST /users
        PUT /users/:id
        DELETE /users/:id
    */
  @Get() // GET /users or /users?role=value
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return this.usersService.findAll(role); //method defined in the service is called from here
  }

  @Get(':id') //GET /users/:id
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id); //using unary operator to convert string to number
  }

  @Get('find/interns') //GET /users/find/intern
  findIntern() {
    return [
      {
        id: 1,
      },
    ];
  }

  @Post() //POST /users
  create(
    @Body()
    user: {
      name: string;
      email: string;
      role: 'INTERN' | 'ENGINEER' | 'ADMIN';
    },
  ) {
    return this.usersService.create(user);
  }

  @Patch(':id') //PUT /users/:id
  update(
    @Param('id') id: string,
    @Body()
    userUpdate: {
      name: string;
      email: string;
      role: 'INTERN' | 'ENGINEER' | 'ADMIN';
    },
  ) {
    return this.usersService.update(+id, userUpdate)
  }

  @Delete(':id') //DELETE /users/:id
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id)
  }
}
