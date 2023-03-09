import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import {
  MediaTypeEnum,
  MediaStatusEnum,
} from '../../common/enums/mediaType.enum';
export class CreateMediaDto {
  @ApiProperty({
    enum: MediaTypeEnum,
  })
  @IsEnum(MediaTypeEnum)
  @IsString()
  type: MediaTypeEnum;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  url: string;

  @ApiProperty({
    enum: MediaStatusEnum,
  })
  @IsEnum(MediaStatusEnum)
  @IsString()
  status: MediaStatusEnum;
}
