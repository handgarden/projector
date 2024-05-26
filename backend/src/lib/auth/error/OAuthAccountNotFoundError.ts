import { CustomError } from '../../../common/filter/error/CustomError';

export class OAuthAccountNotFoundError extends CustomError {
  constructor() {
    super(
      '가입 정보를 찾을 수 없습니다. 회원가입 후 설정에서 OAuth 계정을 연결해주세요.',
    );
  }
}
