export enum DefaultValidationMessage {
  REQUIRED = "필수 입력 항목입니다.",
  // eslint-disable-next-line no-template-curly-in-string
  LENGTH = "${min}이상, ${max} 이하로 입력해주세요.",
  IS_NOT_EMPTY = "빈 값은 허용되지 않습니다.",
  IS_STRING = "문자를 입력해주세요.",
  IS_NUMBER = "숫자를 입력해주세요.",
}
