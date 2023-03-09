import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Ok, StereoResponse } from '../common/response';
import { Media } from 'src/entities/media.entity';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';

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

  @Get('single/:id')
  @ApiOperation({ summary: 'Fetch a single media by id' })
  async findOne(@Param('id') id: string): Promise<Ok<Media>> {
    const media = await this.mediaService.findMedia(id);
    return StereoResponse.Ok(media);
  }

  @Get('search')
  @ApiOperation({
    summary:
      'Search media by title and description or Fetch a paginated list of existing media objects',
  })
  @ApiQuery({
    name: 'query',
    description: 'Paginate query',
    required: false,
    schema: {
      type: 'object',
      properties: {
        page: { type: 'number', description: 'Page number', default: 1 },
        limit: { type: 'number', description: 'Limit per page', default: 10 },
        search: { type: 'string', description: 'Search term', default: '' },
      },
    },
  })
  async search(
    @Paginate() query: PaginateQuery,
  ): Promise<Ok<Paginated<Media>>> {
    const media = await this.mediaService.search(query);
    return StereoResponse.Paginated(media);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing media by id' })
  async update(
    @Param('id') id: string,
    @Body() updateMediaDto: UpdateMediaDto,
  ) {
    const updatedMedia = await this.mediaService.updateMedia(
      id,
      updateMediaDto,
    );
    return StereoResponse.Ok(updatedMedia, 'Update Successful');
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a media item by id.' })
  async remove(@Param('id') id: string) {
    const deletedMedia = await this.mediaService.removeMedia(id);
    return StereoResponse.Ok(deletedMedia, 'deleted successfully');
  }
}
