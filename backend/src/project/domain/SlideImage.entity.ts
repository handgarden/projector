import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { UploadFile } from '../../file/domain/UploadFile.entity';
import { Slide } from './Slide.entity';

@Entity()
export class SlideImage {
  @PrimaryColumn({ name: 'id' })
  @Generated('increment')
  id: number;

  @Column({ name: 'file_id', type: 'varchar', length: 255, nullable: false })
  fileId: string;

  @ManyToOne(() => Slide, (slide) => slide.images, {
    nullable: false,
    lazy: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'slide_id' })
  slide: Promise<Slide>;

  @ManyToOne(() => UploadFile, {
    nullable: false,
    lazy: true,
    cascade: false,
  })
  @JoinColumn({ name: 'file_id' })
  file: Promise<UploadFile>;

  @Column({ name: 'image_seq', type: 'int', nullable: false })
  seq: number;

  static create({
    slide,
    fileId,
    seq,
  }: {
    slide: Slide;
    fileId: string;
    seq: number;
  }) {
    const slideImage = new SlideImage();
    slideImage.slide = Promise.resolve(slide);
    slideImage.fileId = fileId;
    slideImage.seq = seq;
    return slideImage;
  }
}
