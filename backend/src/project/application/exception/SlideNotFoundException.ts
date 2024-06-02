export class SlideNotFoundException extends Error {
  constructor(projectId: number, slideId: number) {
    super(`Slide with id ${slideId} not found in project with id ${projectId}`);
  }
}
