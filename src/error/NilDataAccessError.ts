export class NilDataAccessError extends Error {
  constructor() {
    super(`Can not access to Nil type data`);
  }
}
