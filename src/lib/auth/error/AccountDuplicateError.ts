import { ValidationError } from 'class-validator';
import { RegisterRequestDto } from 'src/api/auth/dto/RegisterRequest.dto';
import { BadParameterError } from 'src/common/filter/validation/BadParameterError';

export class DuplicateAccountError extends BadParameterError {
  constructor(target: RegisterRequestDto) {
    const validationError = new ValidationError();
    validationError.target = target;
    validationError.property = 'account';
    validationError.constraints = {
      isDuplicate: '이미 존재하는 계정입니다.',
    };
    validationError.value = target.account;
    super(validationError);
  }
}
