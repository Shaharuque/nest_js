import {
  Body,
  Query,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
  Res,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import mongoose from 'mongoose';
import { UpdateUserDto } from './dto/UpdateUser.dto';

@Controller('users')
export class UsersController {

  //injecting the service layer into the controller layer
  constructor(private readonly usersService: UsersService) {}

  // Endpoints
  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body() createUserDto:CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  async getUsers(@Res() res: Response) {
    const result= await this.usersService.getUsers();
    res.status(HttpStatus.OK).json({
      succss:true,
      data:result
    });
  }

  @Get(':id')
  async getUserById(@Param('id') id:string) {
    // Checking is the objectId is valid
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if(!isValid) throw new HttpException('Invalid user id', 400);

    const findUser =await this.usersService.getUserById(id);
    if (!findUser) throw new HttpException('User not found', 404);

    return {
      success:true,
      data:findUser
    };
  }

  //update user
  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async updateUser(@Param('id') id:string, @Body() body:UpdateUserDto) {

    // Checking is the objectId is valid
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if(!isValid) throw new HttpException('Invalid user id', 400);

    const findUser =await this.usersService.getUserById(id);
    if (!findUser) throw new HttpException('User not found', 404);

    const updateUser =await this.usersService.updateUser(id, body);
    return {
      success:true,
      data:updateUser
    };
  }

  @Delete(':id')
  async deleteUser(@Param('id') id:string){
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if(!isValid) throw new HttpException('Invalid user id', 400);

    const findUser =await this.usersService.getUserById(id);
    if (!findUser) throw new HttpException('User not found', 404);

    const deleteUser =await this.usersService.deleteUser(id);

    if(!deleteUser) throw new HttpException('User not deleted', 500);
    
    return {
      success:true,
      data:deleteUser
    };
  }



  /* 
        GET /users
        GET /users/:id
        POST /users
        PUT /users/:id
        DELETE /users/:id
    */
  // @Get() // GET /users or /users?role=value
  // findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
  //   return this.usersService.findAll(role); //method defined in the service is called from here
  // }

  // @Get(':id') //GET /users/:id
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id); //using unary operator to convert string to number
  // }

  // @Get('find/interns') //GET /users/find/intern
  // findIntern() {
  //   return [
  //     {
  //       id: 1,
  //     },
  //   ];
  // }

  // @Post() //POST /users
  // create(
  //   @Body()
  //   user: {
  //     name: string;
  //     email: string;
  //     role: 'INTERN' | 'ENGINEER' | 'ADMIN';
  //   },
  // ) {
  //   return this.usersService.create(user);
  // }

  // @Patch(':id') //PUT /users/:id
  // update(
  //   @Param('id') id: string,
  //   @Body()
  //   userUpdate: {
  //     name: string;
  //     email: string;
  //     role: 'INTERN' | 'ENGINEER' | 'ADMIN';
  //   },
  // ) {
  //   return this.usersService.update(+id, userUpdate)
  // }

  // @Delete(':id') //DELETE /users/:id
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id)
  // }
}
