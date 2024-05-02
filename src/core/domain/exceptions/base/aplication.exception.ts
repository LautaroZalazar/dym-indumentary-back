export class AplicationException extends Error {
  constructor(message: string) {
    super(message);
    this.name = AplicationException.name;
  }
}
