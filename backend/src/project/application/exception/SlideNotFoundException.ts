export class SlideNotFoundException extends Error {
  constructor({ slideId, projectId }: { slideId: number; projectId?: number }) {
    super(
      `Slide with id ${slideId} not found` +
        (projectId ? ` in project with id ${projectId}` : ''),
    );
  }
}
