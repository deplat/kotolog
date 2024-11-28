export class ProfileCreationError extends Error {
  constructor(
    public message: string,
    public metadata?: Record<string, any>
  ) {
    super(message)
    this.name = 'ProfileCreationError'
    if (metadata) {
      console.error('ProfileCreationError Metadata:', metadata)
    }
  }
}
