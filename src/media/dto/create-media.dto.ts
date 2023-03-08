import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import {
  MediaTypeEnum,
  MediaStatusEnum,
} from 'src/common/enums/mediaType.enum';
export class CreateMediaDto {
  @ApiProperty({
    enum: MediaTypeEnum,
  })
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
  status: MediaStatusEnum;
}
