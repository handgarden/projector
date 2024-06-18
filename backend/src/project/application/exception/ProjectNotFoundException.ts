export class ProjectNotFoundException extends Error {
  constructor(id: number) {
    super(`Project with id ${id} not found`);
  }
}
