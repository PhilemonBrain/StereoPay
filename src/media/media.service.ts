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
import {
  IPaginationOptions,
  paginate as pags,
  Pagination,
} from 'nestjs-typeorm-paginate';
import {
  FilterOperator,
  PaginateQuery,
  paginate,
  Paginated,
} from 'nestjs-paginate';
import { ConfigService } from '@nestjs/config';
import { configConstant } from '../common/constants/config.constants';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepo: Repository<Media>,
    private readonly configService: ConfigService,
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

  async findAll(options: IPaginationOptions): Promise<Pagination<Media>> {
    const route =
      this.configService.get(configConstant.pagination.baseUrl) + 'media';
    return pags<Media>(this.mediaRepo, { ...options, route });
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
    console.log(query);
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
