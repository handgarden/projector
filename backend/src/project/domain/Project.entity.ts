import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/domain/User.entity';
import { Slide } from './Slide.entity';
import { BaseTimeEntity } from '../../common/entity/BaseTimeEntity';
import { SlideNotFoundException } from '../application/exception/SlideNotFoundException';
import { Nil } from '../../common/nil/Nil';
import { UploadFile } from '../../file/domain/UploadFile.entity';

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

  @Column({
    type: 'varchar',
    length: 255,
    name: 'description',
  })
  description: string;

  @OneToMany(() => Slide, (slide) => slide.project, {
    lazy: true,
    cascade: true,
  })
  slides: Promise<Slide[]>;

  async update({ title, description }: { title: string; description: string }) {
    this.title = title;
    this.description = description;
  }

  async addSlide(slide: Slide) {
    const prevSlides = await this.slides;
    slide.seq = prevSlides.length + 1;
    this.slides = Promise.resolve([...prevSlides, slide]);
    slide.project = Promise.resolve(this);
  }

  async updateSlide({
    slideId,
    updatedTitle,
    updatedDescription,
    updatedImages,
  }: {
    slideId: number;
    updatedTitle: string;
    updatedDescription: string;
    updatedImages: { key: string; seq: number }[];
  }) {
    const slides = await this.slides;

    const targetSlide = slides.find((s) => s.id === slideId);

    if (!targetSlide) {
      throw new SlideNotFoundException({
        projectId: this.id,
        slideId,
      });
    }

    await targetSlide.update({
      title: updatedTitle,
      description: updatedDescription,
      images: updatedImages,
    });
  }

  async deleteSlide(slideId: number) {
    const slides = await this.slides;
    const filteredSlides = slides.filter((s) => s.id !== slideId);
    const sortedSlides = [...filteredSlides]
      .sort((a, b) => a.seq - b.seq)
      .map((s, i) => {
        s.seq = i + 1;
        return s;
      });
    this.slides = Promise.resolve(sortedSlides);
  }

  async getThumbnail(): Promise<Nil<UploadFile>> {
    const slides = await this.slides;
    for (const slide of slides) {
      const images = await slide.images;
      if (images.length > 0) {
        const file = await images[0].file;
        return Nil.of(file);
      }
    }
    return Nil.empty();
  }

  async validateCreator(userId: number) {
    const creator = await this.creator;
    creator.confirmUserId(userId);
  }

  static async fromDto({
    title,
    description,
    creator,
  }: {
    title: string;
    description: string;
    creator: User;
  }) {
    const project = new Project();
    project.title = title;
    project.description = description;
    project.creator = Promise.resolve(creator);
    return project;
  }
}
