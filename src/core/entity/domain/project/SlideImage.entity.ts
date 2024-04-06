import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UploadFile } from '../UploadFile.entity';
import { Slide } from './Slide.entity';

@Entity()
export class SlideImage {
  @ManyToOne(() => Slide, (slide) => slide.images)
  @JoinColumn({ name: 'slide_id' })
  slide: Slide;

  @ManyToOne(() => UploadFile)
  @JoinColumn({ name: 'file_id' })
  file: UploadFile;
}
