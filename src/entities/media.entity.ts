// export class Media {}
import { Entity, Column } from 'typeorm';
import { SharedEntity } from '../common/model/shared.entity';

@Entity()
export class Media extends SharedEntity {
  @Column()
  type: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  url: string;

  @Column()
  status: string;
}
