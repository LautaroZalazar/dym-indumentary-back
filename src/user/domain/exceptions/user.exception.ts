import { DomainException } from "src/core/domain/exceptions/base/domain.exception";

export class UserException extends DomainException {
  constructor(message: string) {
    super(message);
    this.name = UserException.name;
  }
}
