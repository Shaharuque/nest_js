import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Post } from 'src/schemas/post.schema';
import { CreatePostDto } from './dto/createPost.dto';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  //declare methods which are already in use in the controller
  async createPost({ userId, ...createPostDto }: CreatePostDto) {
    console.log('createPostDto', userId, createPostDto);
    if (userId) {
      const isValid = mongoose.Types.ObjectId.isValid(userId);
      if (!isValid) throw new HttpException('Invalid format of user id', 400);
    }

    const findUser = await this.userModel.findById({ _id: userId });
    if (!findUser) {
      throw new Error('User not found');
    }

    const newPost = new this.postModel({
      ...createPostDto,
      user: userId,
    });
    await newPost.save();

    //update the user collection
    await findUser.updateOne({
      $push: {
        posts: newPost._id,
      },
    });

    return newPost;
  }
}
