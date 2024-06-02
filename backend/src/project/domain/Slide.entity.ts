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

  @ManyToOne(() => Project, (project) => project.slides, {
    nullable: false,
    lazy: true,
  })
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
    cascade: true,
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
    slide.images = Promise.resolve(
      images.map((image) =>
        SlideImage.create({
          slide,
          fileId: image.key,
          seq: image.seq,
        }),
      ),
    );

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
    title,
    description,
    images,
  }: {
    title: string;
    description: string;
    images: { key: string; seq: number }[];
  }) {
    this.title = title;
    this.description = description;
    const updatedSlideImages = images.map((i) =>
      SlideImage.create({
        slide: this,
        fileId: i.key,
        seq: i.seq,
      }),
    );

    this.images = Promise.resolve(updatedSlideImages);

    return this;
  }

  async validateCreator(userId: number) {
    const project = await this.project;

    project.validateCreator(userId);
  }
}
