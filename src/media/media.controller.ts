import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  ParseIntPipe,
  DefaultValuePipe,
  Query,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Ok, StereoResponse } from '../common/response';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Media } from 'src/entities/media.entity';

@ApiTags('Media')
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new media object' })
  async create(@Body() createMediaDto: CreateMediaDto) {
    const response = await this.mediaService.createMedia(createMediaDto);
    return StereoResponse.Ok(
      response,
      'Created Successfully',
      HttpStatus.CREATED,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Fetch a paginated list of existing media objects' })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Ok<Pagination<Media>>> {
    const route = 'localhost';
    const medias = await this.mediaService.findAll({
      page,
      limit,
      route,
    });
    return StereoResponse.Paginated(medias);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mediaService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Create an API' })
  update(@Param('id') id: string, @Body() updateMediaDto: UpdateMediaDto) {
    return this.mediaService.update(+id, updateMediaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Create an API' })
  remove(@Param('id') id: string) {
    return this.mediaService.remove(+id);
  }
}
