import { PickType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { MediaStatusEnum } from 'src/common/enums/mediaType.enum';
import { CreateMediaDto } from './create-media.dto';

export class UpdateMediaDto extends PickType(CreateMediaDto, [
  'status',
] as const) {
  @ApiProperty({
    enum: MediaStatusEnum,
  })
  @IsEnum(MediaStatusEnum)
  @IsString()
  status: MediaStatusEnum;
}
