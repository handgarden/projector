import { Injectable } from '@nestjs/common';
import { DataSource, In, Repository } from 'typeorm';
import { Slide } from '../domain/project/Slide.entity';
import { UploadFile } from '../domain/UploadFile.entity';
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
