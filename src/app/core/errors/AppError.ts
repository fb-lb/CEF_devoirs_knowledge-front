export class AppError extends Error {
  constructor(public status: number, public code: string, message: string, public userMessage: string, options? : { cause?: Error }) {
    super(message, options)
    this.name = this.constructor.name;
  };
}