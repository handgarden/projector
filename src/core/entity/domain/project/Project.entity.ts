import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../User.entity';
import { Slide } from './Slide.entity';
import { BaseTimeEntity } from '../../BaseTimeEntity';

@Entity()
export class Project extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { nullable: false, lazy: true })
  @JoinColumn({ name: 'user_id' })
  creator: Promise<User>;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'title',
  })
  title: string;

  @OneToMany(() => Slide, (slide) => slide.project, {
    nullable: false,
    lazy: true,
    cascade: true,
  })
  slides: Promise<Slide[]>;
}
