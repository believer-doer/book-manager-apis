/* eslint-disable new-cap */
import {IsOptional, IsString} from 'class-validator';

export class GetBooksDto {
    @IsOptional()
    @IsString()
      seed: string;

    @IsOptional()
    @IsString()
      count: string;
}
