import { LocalDate, LocalDateTime } from '@js-joda/core';
import { Nil } from '../common/nil/Nil';

export class DateTimeUtils {
  static toString(date: LocalDate | LocalDateTime): string {
    return date.toString();
  }

  static toDate(date: LocalDate | LocalDateTime): Date {
    return new Date(date.toString());
  }

  static toLocalDate(date: Date): LocalDate {
    return LocalDate.parse(date.toISOString());
  }

  static toLocalDateTime(date: Date): LocalDateTime {
    return LocalDateTime.parse(date.toISOString());
  }

  static toLocalDateFromString(date: string): Nil<LocalDate> {
    if (!date) {
      return new Nil();
    }

    return new Nil(LocalDate.parse(date));
  }

  static toLocalDateTimeFromString(date: string): Nil<LocalDateTime> {
    if (!date) {
      return new Nil();
    }

    return new Nil(LocalDateTime.parse(date));
  }
}
