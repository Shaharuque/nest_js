import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
    /* 
        GET /users
        GET /users/:id
        POST /users
        PUT /users/:id
        DELETE /users/:id
    */
   @Get()  //GET /users
    findAll() {
         return [];
    }

    @Get(':id') //GET /users/:id
    findOne(@Param('id') id: string ) {
        return {id};
    }

    @Get('find/interns') //GET /users/find/intern
    findIntern(){
        return [
            {
                id:1
            }
        ]
    }

    @Post() //POST /users
    create(@Body()  user: { name: string, email: string, role: 'INTERN' | 'ENGINEER' | 'ADMIN' }) {
        return user;
    }

    @Patch(':id') //PUT /users/:id
    update(@Param('id') id: string, @Body()  user: { name: string, email: string, role: 'INTERN' | 'ENGINEER' | 'ADMIN' }) {
        return {};
    }

    @Delete(':id') //DELETE /users/:id
    remove(@Param('id') id: string) {
        return {};
    }

}
