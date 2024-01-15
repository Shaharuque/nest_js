//Used basically for validation of the data that is being sent to the server
import {  IsNotEmpty, IsOptional, IsString } from "class-validator";


export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsString()
    @IsOptional()
    displayName?: string;

    @IsString()
    @IsOptional()
    avatarUrl?: string;
}