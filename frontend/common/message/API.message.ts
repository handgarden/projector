export const API_MESSAGE_KR = {
  response: {
    serverError: "서버에서 오류가 발생했습니다.",
    receiveError: (name?: string) =>
      `${name} 데이터를 받아오는 중 오류가 발생했습니다.`,
  },
} as const;
