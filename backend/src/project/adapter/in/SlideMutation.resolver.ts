import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { SlideResponse } from '../dto/response/Slide.response';
import { CreateSlideInput } from '../dto/input/CreateSlide.input';
import { GqlAuth } from '../../../lib/auth/decorator/GqlAuth.decorator';
import { GqlUser } from '../../../lib/auth/decorator/GqUser.decorator';
import { TokenUser } from '../../../lib/auth/types/TokenUser';
import { UpdateSlideInput } from '../dto/input/UpdateSlide.input';
import { ParseIntPipe } from '@nestjs/common';
import { ProjectMutateUseCase } from '../../application/ports/in/ProjectMutateUseCase';
import { DeleteSlideDto } from '../../application/dto/DeleteSlide.dto';

@GqlAuth()
@Resolver(() => SlideResponse)
export class SlideMutationResolver {
  constructor(private readonly mutateProjectUseCase: ProjectMutateUseCase) {}

  @Mutation(() => SlideResponse)
  async addSlide(
    @GqlUser() user: TokenUser,
    @Args('slide', { type: () => CreateSlideInput }) slide: CreateSlideInput,
  ): Promise<SlideResponse> {
    const created = await this.mutateProjectUseCase.addSlide(
      slide.toDto(user.id),
    );
    return SlideResponse.fromDto(created);
  }

  @Mutation(() => SlideResponse)
  async updateSlide(
    @GqlUser() user: TokenUser,
    @Args('slide', { type: () => UpdateSlideInput }) slide: UpdateSlideInput,
  ): Promise<SlideResponse> {
    const updated = await this.mutateProjectUseCase.updateSlide(
      slide.toDto(user.id),
    );
    return SlideResponse.fromDto(updated);
  }

  @Mutation(() => Boolean)
  async deleteSlide(
    @GqlUser() user: TokenUser,
    @Args('projectId', { type: () => ID }, ParseIntPipe) projectId: number,
    @Args('slideId', { type: () => ID }, ParseIntPipe) slideId: number,
  ): Promise<boolean> {
    const deleteDto = new DeleteSlideDto();
    deleteDto.projectId = projectId;
    deleteDto.slideId = slideId;
    deleteDto.creatorId = user.id;
    await this.mutateProjectUseCase.deleteSlide(deleteDto);
    return true;
  }
}
