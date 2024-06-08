import { CreateSlideImageDto } from './CreateSlideImage.dto';

export class CreateSlideDto {
  creatorId: number;
  projectId: number;
  seq: number;
  title: string;
  description: string;
  images: CreateSlideImageDto[];
}
