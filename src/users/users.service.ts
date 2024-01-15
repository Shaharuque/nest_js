import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';

@Injectable()
export class UsersService {
    //Injecting the model into the service
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    //declare methods which are already in use in the controller
    async createUser(createUserDto:CreateUserDto){
        const newUser=new this.userModel(createUserDto);
        return await newUser.save();
    }

    getUsers(){
        return this.userModel.find().exec();
    }


    getUserById(id:string){
        return this.userModel.findById(id)
    }

    updateUser(id:string, body:UpdateUserDto){
        const updated= this.userModel.findOneAndUpdate({_id:id},body,{new:true})
        return updated;
    }

    deleteUser(id:string){
        return this.userModel.findOneAndDelete({_id:id})
    }

    // private users = [
    //     {
    //         "id": 1,
    //         "name": "Leanne Graham",
    //         "email": "Sincere@april.biz",
    //         "role": "INTERN",
    //     },
    //     {
    //         "id": 2,
    //         "name": "Ervin Howell",
    //         "email": "Shanna@melissa.tv",
    //         "role": "INTERN",
    //     },
    //     {
    //         "id": 3,
    //         "name": "Clementine Bauch",
    //         "email": "Nathan@yesenia.net",
    //         "role": "ENGINEER",
    //     },
    //     {
    //         "id": 4,
    //         "name": "Patricia Lebsack",
    //         "email": "Julianne.OConner@kory.org",
    //         "role": "ENGINEER",
    //     },
    //     {
    //         "id": 5,
    //         "name": "Chelsey Dietrich",
    //         "email": "Lucio_Hettinger@annie.ca",
    //         "role": "ADMIN",
    //     }
    // ]

    // //declare methods which are already in use in the controller
    // findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    //     if (role) {
    //         return this.users.filter(user => user.role === role)
    //     }
    //     return this.users
    // }

    // findOne(id: number) {
    //     const user = this.users.find(user => user.id === id)

    //     return user
    // }

    // create(user: { name: string, email: string, role: 'INTERN' | 'ENGINEER' | 'ADMIN' }) {
    //     const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id)
    //     const newUser = {
    //         id: usersByHighestId[0].id + 1,
    //         ...user
    //     }
    //     this.users.push(newUser)
    //     return this.users
    // }

    // update(id: number, updatedUser: { name?: string, email?: string, role?: 'INTERN' | 'ENGINEER' | 'ADMIN' }) {
    //     this.users = this.users.map(user => {
    //         if (user.id === id) {
    //             return { ...user, ...updatedUser }
    //         }
    //         return user
    //     })

    //     return this.findOne(id)
    // }

    // remove(id: number) {
    //     const removedUser = this.findOne(id)

    //     this.users = this.users.filter(user => user.id !== id)

    //     return removedUser
    // }
}
