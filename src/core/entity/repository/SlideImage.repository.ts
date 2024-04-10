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
    const entries = await this.find({
      select: {
        slide: {
          project: {
            id: true,
          },
        },
        fileId: true,
      },
      where: {
        slide: {
          project: {
            id: In(projectIds),
          },
          seq: 1,
        },
        seq: 1,
      },
    });

    return Promise.all(
      entries.map(async (entry) => {
        const slide = await entry.slide;
        const project = await slide.project;
        return [project.id, entry.fileId];
      }),
    );
  }
}
