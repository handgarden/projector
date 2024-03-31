import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { AuthValidationMessage } from 'src/common/message/validation/AuthValidation.message';
import { DefaultValidationMessage } from 'src/common/message/validation/DefaultValidation.meesage';

export class RegisterRequestDto {
  @IsString({ message: DefaultValidationMessage.IS_STRING })
  @IsNotEmpty({ message: DefaultValidationMessage.IS_NOT_EMPTY })
  @Length(4, 20, { message: DefaultValidationMessage.LENGTH })
  @Matches(/^[a-zA-Z0-9]+$/, { message: AuthValidationMessage.ACCOUNT_PATTERN })
  account: string;

  @IsString({ message: DefaultValidationMessage.IS_STRING })
  @IsNotEmpty({ message: DefaultValidationMessage.IS_NOT_EMPTY })
  @Length(8, 20, { message: DefaultValidationMessage.LENGTH })
  @Matches(/^(?=.*[a-zA-Z])(?=.*[0-9])/, {
    message: AuthValidationMessage.PASSWORD_PATTERN,
  })
  password: string;
}
