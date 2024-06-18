import { CreateSlideImageDto } from './CreateSlideImage.dto';

export class UpdateSlideDto {
  creatorId: number;
  projectId: number;
  slideId: number;
  title: string;
  description: string;
  images: CreateSlideImageDto[];
}
