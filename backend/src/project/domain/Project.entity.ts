import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../core/entity/domain/user/User.entity';
import { Slide } from './Slide.entity';
import { BaseTimeEntity } from '../../core/entity/BaseTimeEntity';
import { CreateProjectDto } from '../application/dto/CreateProject.dto';

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

  static async fromDto(dto: CreateProjectDto) {
    const project = new Project();
    project.title = dto.title;
    project.description = dto.description;
    project.creator = Promise.resolve({ id: dto.creatorId } as User);
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
