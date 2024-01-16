import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }, collection: 'UserSettings' })

export class UserSettings{

    @Prop({ required: false })
    receiveNotifications: boolean;

    @Prop({ required: false })
    receiveEmails: boolean;

    @Prop({ required: false })
    receiveSMS: boolean;
}

//createForClass is a static method that accepts a class and returns a schema definition. Basically it will create the schema in db
export const UserSettingsSchema = SchemaFactory.createForClass(UserSettings);

