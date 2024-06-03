import { LocalDateTime } from '@js-joda/core';
import { User } from '../../domain/User.entity';
import { DateTimeUtils } from '../../../util/DateTImeUtils';

export class UserDto {
  id: number;
  account: string;
  createdAt: LocalDateTime;

  static fromEntity(user: User): UserDto {
    const userDto = new UserDto();
    userDto.id = user.id;
    userDto.account = user.account;
    userDto.createdAt = DateTimeUtils.toLocalDateTime(user.createdAt);
    return userDto;
  }
}
