/* eslint-disable new-cap */
import {IsString} from 'class-validator';

export class UpdateBookDto {
    @IsString()
      title: string;

    @IsString()
      author: string;

    @IsString()
      summary: string;
}
