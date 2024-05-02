import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '../../common/page/PaginatedResponse';
import { ProjectModel } from './Project.model';

@ObjectType()
export class PaginatedProjectModel extends Paginated(ProjectModel) {}
