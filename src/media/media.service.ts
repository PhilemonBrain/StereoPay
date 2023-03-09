import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Media } from '../entities/media.entity';
import { StereoResponse } from 'src/common/response';
import { PaginateQuery, paginate, Paginated } from 'nestjs-paginate';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepo: Repository<Media>,
  ) {}

  async createMedia(createMediaDto: CreateMediaDto): Promise<Media> {
    try {
      const newMedia = this.mediaRepo.create(createMediaDto);
      return await this.mediaRepo.save(newMedia);
    } catch (error) {
      throw new InternalServerErrorException(
        StereoResponse.InternalServerError(error),
      );
    }
  }

  async findOne(id: string) {
    let media;
    try {
      media = await this.mediaRepo.findOne({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(
        StereoResponse.InternalServerError('Error Occured'),
      );
    }
    if (!media) {
      throw new NotFoundException(
        StereoResponse.NotFoundRequest('Invalid media id'),
      );
    }
    return media;
  }

  async search(query: PaginateQuery): Promise<Paginated<Media>> {
    try {
      return paginate(query, this.mediaRepo, {
        sortableColumns: ['name', 'description'],
        searchableColumns: ['name', 'description'],
        defaultSortBy: [['id', 'DESC']],
      });
    } catch (error) {
      throw new InternalServerErrorException(
        StereoResponse.BadRequest('Internal Server error', error.message),
      );
    }
  }

  update(id: number, updateMediaDto: UpdateMediaDto) {
    return `This action updates a #${id} media`;
  }

  remove(id: number) {
    return `This action removes a #${id} media`;
  }
}
