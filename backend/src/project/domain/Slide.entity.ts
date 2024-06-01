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
import { BaseTimeEntity } from '../../core/entity/BaseTimeEntity';

@Entity()
export class Slide extends BaseTimeEntity {
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
    cascade: false,
    persistence: false,
  })
  images: Promise<SlideImage[]>;

  static async create({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) {
    const slide = new Slide();
    slide.title = title;
    slide.description = description;

    return slide;
  }

  async addImages(images: SlideImage[]) {
    const prevImages = await this.images;
    images.forEach((i) => {
      i.slide = Promise.resolve(this);
      i.slideId = this.id;
    });
    this.images = Promise.resolve([...prevImages, ...images]);

    return this;
  }

  async update({
    userId,
    title,
    description,
    images,
  }: {
    userId: number;
    title: string;
    description: string;
    images: SlideImage[];
  }) {
    await this.validateCreator(userId);

    this.title = title;
    this.description = description;
    images.forEach((i) => {
      i.slide = Promise.resolve(this);
      i.slideId = this.id;
    });
    this.images = Promise.resolve(images);

    return this;
  }

  async validateCreator(userId: number) {
    const project = await this.project;

    project.validateCreator(userId);
  }
}
