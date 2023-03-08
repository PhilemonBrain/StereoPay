// export class Media {}
import { Entity, Column } from 'typeorm';
import { SharedEntity } from '../common/model/shared.entity';
import { MediaStatusEnum, MediaTypeEnum } from '../common/enums/mediaType.enum';

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
