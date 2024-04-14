import { Injectable } from '@nestjs/common';
import { DataSource, In, Repository } from 'typeorm';
import { Slide } from '../domain/project/Slide.entity';
import { Nil } from '../../../common/nil/Nil';
import { SlideImage } from '../domain/project/SlideImage.entity';

@Injectable()
export class SlideRepository extends Repository<Slide> {
  constructor(dataSource: DataSource) {
    super(Slide, dataSource.manager);
  }

  async findById(id: number) {
    const entity = await this.findOne({
      where: {
        id,
      },
      relations: {
        project: {
          creator: true,
        },
        images: true,
      },
    });

    return Nil.of(entity);
  }

  async findOneByProjectIdAndSeq(projectId: number, seq: number) {
    const entity = await this.findOne({
      where: {
        project: {
          id: projectId,
        },
        seq,
      },
    });

    return Nil.of(entity);
  }

  async findImagesByIds(ids: number[]): Promise<[number, SlideImage[]][]> {
    const slides = await this.find({
      select: {
        id: true,
        images: true,
      },
      where: {
        id: In(ids),
      },
      relations: {
        images: {
          file: true,
        },
      },
    });

    return Promise.all(
      slides.map(async (slide) => {
        const slideImages = await slide.images;

        return [slide.id, slideImages];
      }),
    );
  }
}
