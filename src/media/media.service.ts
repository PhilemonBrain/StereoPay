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
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepo: Repository<Media>,
  ) {}

  async createMedia(createMediaDto: CreateMediaDto): Promise<Media> {
    try {
      const newMedia = this.mediaRepo.create(createMediaDto);
      console.log(newMedia);
      return await this.mediaRepo.save(newMedia);
    } catch (error) {
      throw new InternalServerErrorException(
        StereoResponse.InternalServerError(error),
      );
    }
  }

  findAll(options: IPaginationOptions): Promise<Pagination<Media>> {
    return paginate<Media>(this.mediaRepo, options);
    // return `This action returns all media`;
  }

  async findOne(id: string) {
    try {
      const media = await this.mediaRepo.findOne({ where: { id } });
      if (!media) {
        throw new NotFoundException(
          StereoResponse.NotFoundRequest('Invalid media id'),
        );
      }
      return media;
    } catch (error) {
      throw new InternalServerErrorException(
        StereoResponse.InternalServerError(error),
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
