import { Field, InputType, Int } from '@nestjs/graphql';
import { PageableType } from '../../../common/page/Pageable';

@InputType()
export class PaginationInput implements PageableType {
  @Field(() => Int)
  page: number = 1;

  @Field(() => Int)
  size: number = 20;

  get skip(): number {
    return (this.page - 1) * this.size;
  }

  next(): PaginationInput {
    const nextPage = new PaginationInput();
    nextPage.page = this.page + 1;
    nextPage.size = this.size;
    return nextPage;
  }

  prev(): PaginationInput {
    const prevPage = new PaginationInput();
    prevPage.page = this.page - 1 < 1 ? 1 : this.page - 1;
    prevPage.size = this.size;
    return prevPage;
  }
}
