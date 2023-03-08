// export class Media {}
import { Entity, Column } from 'typeorm';
import { SharedEntity } from 'src/common/model/shared.entity';
import {
  MediaStatusEnum,
  MediaTypeEnum,
} from 'src/common/enums/mediaType.enum';

@Entity()
export class Media extends SharedEntity {
  @Column({
    type: 'enum',
    enum: MediaTypeEnum,
    nullable: false,
  })
  type: MediaTypeEnum;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  url: string;

  @Column({
    type: 'enum',
    enum: MediaStatusEnum,
  })
  status: MediaStatusEnum;
}
