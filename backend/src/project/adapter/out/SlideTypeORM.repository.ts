import { DataSource, In, Repository } from 'typeorm';
import { Slide } from '../../domain/Slide.entity';
import { SlidePersistencePort } from '../../application/port/out/SlidePersistencePort';
import { Nil } from '../../../common/nil/Nil';
import { SlideImage } from '../../domain/SlideImage.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SlideTypeORMRepository
  extends Repository<Slide>
  implements SlidePersistencePort
{
  constructor(dataSource: DataSource) {
    super(Slide, dataSource.manager);
  }
  async findSlidesByProjectIds(
    projectIds: number[],
  ): Promise<{ [projectId: number]: Slide[] }> {
    const slides = await this.find({
      where: {
        project: {
          id: In(projectIds),
        },
      },
    });

    const projectIdToSlidesMap: { [projectId: number]: Slide[] } =
      projectIds.reduce((acc, projectId) => {
        return {
          ...acc,
          [projectId]: [],
        };
      }, {});
    slides.forEach((slide) => {
      projectIdToSlidesMap[slide.projectId].push(slide);
    });
    return projectIdToSlidesMap;
  }

  async findSlideById(id: number): Promise<Nil<Slide>> {
    const slide = await this.findOne({
      where: {
        id,
      },
    });
    return Nil.of(slide);
  }

  async findSlideImagesBySlideIds(slideIds: number[]): Promise<SlideImage[]> {
    const slides = await this.find({
      where: {
        id: In(slideIds),
      },
      relations: {
        images: true,
      },
    });
    const images = await Promise.all(slides.map((slide) => slide.images));
    return images.flat();
  }
}
