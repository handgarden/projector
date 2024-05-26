import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '../../common/page/PaginatedResponse';
import { ProjectResponse } from './Project.response';

@ObjectType()
export class PaginatedProjectResponse extends Paginated(ProjectResponse) {}
