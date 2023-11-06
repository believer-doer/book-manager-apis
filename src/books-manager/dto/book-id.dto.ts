/* eslint-disable new-cap */
import {IsString} from 'class-validator';

export class BookIdDto {
    @IsString()
      id: string;
}
