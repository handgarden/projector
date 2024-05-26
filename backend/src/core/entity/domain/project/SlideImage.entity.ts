import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { UploadFile } from '../UploadFile.entity';
import { Slide } from './Slide.entity';

@Entity()
export class SlideImage {
  @PrimaryColumn({ name: 'slide_id' })
  slideId: number;

  @PrimaryColumn({ name: 'file_id' })
  fileId: string;

  @ManyToOne(() => Slide, (slide) => slide.images, {
    nullable: false,
    lazy: true,
  })
  @JoinColumn({ name: 'slide_id' })
  slide: Promise<Slide>;

  @ManyToOne(() => UploadFile, { nullable: false, lazy: true })
  @JoinColumn({ name: 'file_id' })
  file: Promise<UploadFile>;

  @Column({ name: 'image_seq', type: 'int', nullable: false })
  seq: number;
}