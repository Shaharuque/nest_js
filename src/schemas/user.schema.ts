import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { UserSettings } from "./user.setting.schema";
import { Post } from "./post.schema";


@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }, collection: 'Users' })
export class User {
    @Prop({ unique: true, required: true })
    username: string;
  
    @Prop({ required: false })
    displayName?: string;
  
    @Prop({ required: false })
    avatarUrl?: string;
  
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserSettings' })
    settings?: UserSettings;
    
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] })
    posts?: Post[];
}

export const UserSchema = SchemaFactory.createForClass(User);
