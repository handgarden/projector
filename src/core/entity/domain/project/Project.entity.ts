import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/User.entity';
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

  @Column({
    type: 'varchar',
    length: 255,
    name: 'description',
  })
  description: string;

  @OneToMany(() => Slide, (slide) => slide.project, {
    lazy: true,
  })
  slides: Promise<Slide[]>;

  async addSlide(userId: number, slide: Slide) {
    const creator = await this.creator;
    creator.confirmUserId(userId);

    const prevSlides = await this.slides;
    slide.seq = prevSlides.length + 1;
    this.slides = Promise.resolve([...prevSlides, slide]);
    slide.project = Promise.resolve(this);
  }

  static async create({
    title,
    description,
    creatorId,
  }: {
    title: string;
    description: string;
    creatorId: number;
  }) {
    const project = new Project();
    project.title = title;
    project.description = description;
    project.creator = Promise.resolve({ id: creatorId } as User);
    return project;
  }

  async update({
    creatorId,
    title,
    description,
  }: {
    creatorId: number;
    title: string;
    description: string;
  }) {
    (await this.creator).confirmUserId(creatorId);

    this.title = title;
    this.description = description;
  }

  async validateCreator(userId: number) {
    const creator = await this.creator;
    creator.confirmUserId(userId);
  }

  async removeSlide({ userId, slideId }: { userId: number; slideId: number }) {
    const creator = await this.creator;
    creator.confirmUserId(userId);

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
}
