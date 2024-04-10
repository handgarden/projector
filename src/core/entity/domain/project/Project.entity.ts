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

  @Column({
    type: 'varchar',
    length: 255,
    name: 'description',
  })
  description: string;

  @OneToMany(() => Slide, (slide) => slide.project, {
    nullable: false,
    lazy: true,
    cascade: true,
  })
  slides: Promise<Slide[]>;

  async addSlides(slides: Slide[]) {
    slides.forEach((s) => (s.project = Promise.resolve(this)));
    (await this.slides).push(...slides);
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
}
