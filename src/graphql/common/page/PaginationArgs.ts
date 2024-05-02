import { ArgsType, Field, Int } from '@nestjs/graphql';
import { PageableType } from '../../../common/page/Pageable';

@ArgsType()
export class PaginationArgs implements PageableType {
  @Field(() => Int)
  page: number = 1;

  @Field(() => Int)
  size: number = 20;

  get skip(): number {
    return (this.page - 1) * this.size;
  }

  next(): PaginationArgs {
    const nextPage = new PaginationArgs();
    nextPage.page = this.page + 1;
    nextPage.size = this.size;
    return nextPage;
  }

  prev(): PaginationArgs {
    const prevPage = new PaginationArgs();
    prevPage.page = this.page - 1 < 1 ? 1 : this.page - 1;
    prevPage.size = this.size;
    return prevPage;
  }
}
