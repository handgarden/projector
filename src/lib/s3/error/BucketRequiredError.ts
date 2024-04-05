export class BucketRequiredError extends Error {
  constructor(vendor: string, envProperty: string) {
    super(
      `Bucket name is required for ${vendor}. Please set ${envProperty} in your environment.`,
    );
  }
}
