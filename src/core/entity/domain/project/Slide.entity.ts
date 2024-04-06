import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SlideImage } from './SlideImage.entity';
import { Project } from './Project.entity';

@Entity()
export class Slide {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, { nullable: false, lazy: true })
  @JoinColumn({ name: 'project_id' })
  project: Promise<Project>;

  @Column({
    type: 'int',
    name: 'seq',
  })
  seq: number;

  @Column({
    type: 'varchar',
    length: '255',
    nullable: false,
  })
  title: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  description: string;

  @OneToMany(() => SlideImage, (image) => image.slide, {
    nullable: false,
    lazy: true,
  })
  images: Promise<SlideImage[]>;
}
