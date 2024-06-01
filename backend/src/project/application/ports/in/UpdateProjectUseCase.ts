export interface UpdateProjectUseCase {
  updateProject(): void;
  addSlide(): void;
  updateSlide(): void;
  removeSlide(): void;
}

export const UpdateProjectUseCase = Symbol('UpdateProjectUseCase');
