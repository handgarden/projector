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
import { BaseTimeEntity } from '../../common/entity/BaseTimeEntity';
import { instanceToInstance } from 'class-transformer';

@Entity()
export class Slide extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, (project) => project.slides, {
    nullable: false,
    lazy: true,
  })
  @JoinColumn({ name: 'project_id' })
  project: Promise<Project>;

  @Column({
    type: 'int',
    name: 'project_id',
  })
  projectId: number;

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
    cascade: false,
  })
  images: Promise<SlideImage[]>;

  static create({
    title,
    description,
    images,
  }: {
    title: string;
    description: string;
    images: {
      key: string;
      seq: number;
    }[];
  }) {
    const slide = new Slide();
    slide.title = title;
    slide.description = description;
    const slideImages = images.map((image) =>
      SlideImage.create({
        slide,
        fileId: image.key,
        seq: image.seq,
      }),
    );
    slide.images = Promise.resolve(slideImages);

    return slide;
  }

  async update({
    title,
    description,
    images,
  }: {
    title: string;
    description: string;
    images: { key: string; seq: number }[];
  }) {
    const updatedSlide = instanceToInstance(this);
    updatedSlide.title = title;
    updatedSlide.description = description;
    const updatedSlideImages = images.map((i) =>
      SlideImage.create({
        slide: updatedSlide,
        fileId: i.key,
        seq: i.seq,
      }),
    );

    updatedSlide.images = Promise.resolve(updatedSlideImages);

    return updatedSlide;
  }

  async validateCreator(userId: number) {
    const project = await this.project;

    project.validateCreator(userId);
  }
}
