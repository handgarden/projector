import { DataSource, In, Repository } from 'typeorm';
import { SlideImage } from '../domain/project/SlideImage.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SlideImageRepository extends Repository<SlideImage> {
  constructor(dataSource: DataSource) {
    super(SlideImage, dataSource.manager);
  }

  async findThumbnailByProjectIds(
    projectIds: number[],
  ): Promise<[number, string][]> {
    const entries = await this.createQueryBuilder('slideImage')
      .select('slideImage.fileId')
      .addSelect('slide.id')
      .addSelect('project.id')
      .innerJoin('slideImage.slide', 'slide')
      .innerJoin('slide.project', 'project')
      .innerJoin(
        (qb) => {
          return qb
            .select('MIN(slide2.seq)', 'seq')
            .addSelect('project2.id', 'projectId')
            .from(SlideImage, 'slideImage2')
            .innerJoin('slideImage2.slide', 'slide2')
            .innerJoin('slide2.project', 'project2')
            .where('project2.id IN (:...projectIds)', { projectIds })
            .groupBy('project2.id');
        },
        'firstSlide',
        'project.id = firstSlide.projectId AND slide.seq = firstSlide.seq',
      )
      .where('slideImage.seq = 1')
      .andWhere('project.id IN (:...projectIds)', { projectIds })
      .getMany();

    return Promise.all(
      entries.map(async (entry) => {
        const slide = await entry.slide;
        const project = await slide.project;
        return [project.id, entry.fileId];
      }),
    );
  }
}
