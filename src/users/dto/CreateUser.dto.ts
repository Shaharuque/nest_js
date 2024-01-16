//Used basically for validation of the data that is being sent to the server
import { Type } from "class-transformer";
import {  IsBoolean, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";

export class CreateUserSettingsDto {
    @IsOptional()
    @IsBoolean()
    receiveNotifications?: boolean;
  
    @IsOptional()
    @IsBoolean()
    receiveEmails?: boolean;
  
    @IsOptional()
    @IsBoolean()
    receiveSMS?: boolean;
  }

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

    @IsOptional()
    @ValidateNested()  //This is used to validate nested objects as settings is going to be an object
    @Type(() => CreateUserSettingsDto)
    settings?: CreateUserSettingsDto;
}