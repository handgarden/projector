import {
  DateTimeParseException,
  LocalDate,
  LocalDateTime,
} from '@js-joda/core';
import { DateTimeUtils } from '../../../src/util/DateTImeUtils';

describe(DateTimeUtils, () => {
  const year = 2024;
  const month = 5;
  const day = 15;
  const hour = 12;
  const minute = 30;
  const second = 45;

  describe('toString', () => {
    it("LocalDate는 'yyyy-MM-dd' 형식으로 변환한다.", () => {
      //given
      const date = LocalDate.of(year, month, day);

      //when
      const result = DateTimeUtils.toString(date);

      //then
      expect(result).toBe(`${year}-0${month}-${day}`);
    });

    it("LocalDateTime은 'yyyy-MM-dd HH:mm:ss' 형식으로 변환한다.", () => {
      //given
      const date = LocalDateTime.of(year, month, day, hour, minute, second);

      //when
      const result = DateTimeUtils.toString(date);

      //then
      expect(result).toBe(
        `${year}-0${month}-${day} ${hour}:${minute}:${second}`,
      );
    });
  });

  describe('toDate', () => {
    it('LocalDate를 Date로 변환한다.', () => {
      //given
      const date = LocalDate.of(year, month, day);

      //when
      const result = DateTimeUtils.toDate(date);

      //then
      expect(result).toBeInstanceOf(Date);
      expect(result.getFullYear()).toBe(year);
      expect(result.getMonth()).toBe(month - 1);
      expect(result.getDate()).toBe(day);
    });

    it('LocalDateTime을 Date로 변환한다.', () => {
      //given
      const date = LocalDateTime.of(year, month, day, hour, minute, second);

      //when
      const result = DateTimeUtils.toDate(date);

      //then
      expect(result).toBeInstanceOf(Date);
      expect(result.getFullYear()).toBe(year);
      expect(result.getMonth()).toBe(month - 1);
      expect(result.getDate()).toBe(day);
      expect(result.getHours()).toBe(hour);
      expect(result.getMinutes()).toBe(minute);
      expect(result.getSeconds()).toBe(second);
    });
  });

  describe('toLocalDate', () => {
    it('Date를 LocalDate로 변환한다.', () => {
      //given
      const date = new Date(year, month - 1, day);

      //when
      const result = DateTimeUtils.toLocalDate(date);

      //then
      expect(result).toBeInstanceOf(LocalDate);
      expect(result.year()).toBe(year);
      expect(result.monthValue()).toBe(month);
      expect(result.dayOfMonth()).toBe(day);
    });
  });

  describe('toLocalDateTime', () => {
    it('Date를 LocalDateTime으로 변환한다.', () => {
      //given
      const date = new Date(year, month - 1, day, hour, minute, second);

      //when
      const result = DateTimeUtils.toLocalDateTime(date);

      //then
      expect(result).toBeInstanceOf(LocalDateTime);
      expect(result.year()).toBe(year);
      expect(result.monthValue()).toBe(month);
      expect(result.dayOfMonth()).toBe(day);
      expect(result.hour()).toBe(hour);
      expect(result.minute()).toBe(minute);
      expect(result.second()).toBe(second);
    });
  });

  describe('toLocalDateFromString', () => {
    it('날짜 문자열을 LocalDate로 변환한다.', () => {
      //given
      const date = `${year}-0${month}-${day}`;

      //when
      const result = DateTimeUtils.toLocalDateFromString(date);

      //then
      expect(result.isNotNil()).toBeTruthy();
      expect(result.unwrap().toString()).toBe(date);
    });

    it('빈 문자열이면 Nil.empty()를 반환한다.', () => {
      //given
      const date = '';

      //when
      const result = DateTimeUtils.toLocalDateFromString(date);

      //then
      expect(result.isNil()).toBeTruthy();
    });

    it('YYYY-MM-DD 형식이 아니면 DateTimeParseException을 던진다.', () => {
      //given
      const date = '2024-05-15 12:30:45';

      //when
      const result = () => DateTimeUtils.toLocalDateFromString(date);

      //then
      expect(result).toThrow(DateTimeParseException);
    });
  });

  describe('toLocalDateTimeFromString', () => {
    it('날짜와 시간 문자열을 LocalDateTime으로 변환한다.', () => {
      //given
      const date = `${year}-0${month}-${day} ${hour}:${minute}:${second}`;

      //when
      const result = DateTimeUtils.toLocalDateTimeFromString(date);

      //then
      expect(result.isNotNil()).toBeTruthy();
      expect(result.unwrap().toString()).toBe(
        LocalDateTime.of(year, month, day, hour, minute, second).toString(),
      );
    });

    it('빈 문자열이면 Nil.empty()를 반환한다.', () => {
      //given
      const date = '';

      //when
      const result = DateTimeUtils.toLocalDateTimeFromString(date);

      //then
      expect(result.isNil()).toBeTruthy();
    });

    it('YYYY-MM-DD HH:mm:ss 형식이 아니면 DateTimeParseException을 던진다.', () => {
      //given
      const date = '2024-05-15';

      //when
      const result = () => DateTimeUtils.toLocalDateTimeFromString(date);

      //then
      expect(result).toThrow(DateTimeParseException);
    });
  });
});
