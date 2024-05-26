import {
  DateTimeFormatter,
  LocalDate,
  LocalDateTime,
  nativeJs,
} from '@js-joda/core';
import { Nil } from '../common/nil/Nil';

export class DateTimeUtils {
  private static DATE_FORMATTER = DateTimeFormatter.ofPattern('yyyy-MM-dd');
  private static DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern(
    'yyyy-MM-dd HH:mm:ss',
  );
  static toString(date: LocalDate | LocalDateTime): string {
    if (date instanceof LocalDateTime) {
      return date.format(DateTimeUtils.DATE_TIME_FORMATTER);
    }
    return date.format(DateTimeUtils.DATE_FORMATTER);
  }

  static toDate(date: LocalDate | LocalDateTime): Date {
    return new Date(date.toString());
  }

  static toLocalDate(date: Date): LocalDate {
    return LocalDate.from(nativeJs(date));
  }

  static toLocalDateTime(date: Date): LocalDateTime {
    return LocalDateTime.from(nativeJs(date));
  }

  static toLocalDateFromString(date: string): Nil<LocalDate> {
    if (!date) {
      return Nil.empty();
    }

    return Nil.of(LocalDate.parse(date, this.DATE_FORMATTER));
  }

  static toLocalDateTimeFromString(date: string): Nil<LocalDateTime> {
    if (!date) {
      return Nil.empty();
    }

    return Nil.of(LocalDateTime.parse(date, this.DATE_TIME_FORMATTER));
  }
}
