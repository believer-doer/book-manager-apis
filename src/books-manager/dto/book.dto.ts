/* eslint-disable new-cap */
import {IsOptional, IsString} from 'class-validator';

export class BookDto {
    @IsString()
      title: string;

    @IsString()
      author: string;

    @IsOptional()
    @IsString()
      summary: string;
}
