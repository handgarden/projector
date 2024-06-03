export class CreatorNotFoundException extends Error {
  constructor(id: number) {
    super(`Creator with id ${id} not found`);
  }
}
