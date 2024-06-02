import { SlideImageDto } from './SlideImage.dto';

export class CreateSlideDto {
  creatorId: number;
  projectId: number;
  seq: number;
  title: string;
  description: string;
  images: SlideImageDto[];
}
