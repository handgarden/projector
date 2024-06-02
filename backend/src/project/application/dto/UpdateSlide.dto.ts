import { SlideImageDto } from './SlideImage.dto';

export class UpdateSlideDto {
  creatorId: number;
  projectId: number;
  slideId: number;
  title: string;
  description: string;
  images: SlideImageDto[];
}
