import { create } from "zustand";
import { StateStatus } from "../types/common/StateStatus.type";
import { LoginRequest } from "../types/auth/LoginRequest.type";
import { post } from "../common/axios";
import { LoginResponse } from "../types/auth/LoginResponse.type";
import { ResponseStatus } from "../types/api/RestTemplate.type";
import { JwtTokenUtils } from "../utils/JwtTokenUtils";
import { OAuthProvider } from "../gql/graphql";

type AuthStore = {
  status: StateStatus;
  error: null | string;
  tokenLogin: () => void;
  login: (req: LoginRequest, redirect: () => void) => Promise<void>;
  logout: () => void;
  oauthLogin: (
    code: string,
    provider: OAuthProvider,
    completeFunc: Function,
    errorFunc: Function
  ) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  status: StateStatus.INITIAL,
  error: null,
  tokenLogin: async () => {
    const accessToken = JwtTokenUtils.getToken();

    if (!accessToken) {
      set({
        status: StateStatus.FAILURE,
        error: null,
      });
      return;
    }

    set({ status: StateStatus.PENDING });

    const res = await post<null, LoginResponse | null>(
      "/auth/access",
      null,
      accessToken
    );

    if (res.status === ResponseStatus.OK) {
      set({
        status: StateStatus.SUCCESS,
      });
    } else {
      JwtTokenUtils.removeToken();
      set({ status: StateStatus.INITIAL });
    }
  },
  login: async (req: LoginRequest, redirect: () => void) => {
    set({ status: StateStatus.PENDING });
    const res = await post<LoginRequest, LoginResponse | null>(
      "/auth/login",
      req
    );
    if (res.status === ResponseStatus.OK) {
      JwtTokenUtils.setToken((res.data as LoginResponse).accessToken);
      set({
        status: StateStatus.SUCCESS,
      });
      redirect();
    } else {
      const error = res.message ?? "로그인에 실패했습니다.";
      set({ error, status: StateStatus.FAILURE });
    }
  },
  logout: () => {
    JwtTokenUtils.removeToken();
    set({ status: StateStatus.INITIAL });
  },
  oauthLogin: async (
    code: string,
    provider: OAuthProvider,
    completeFunc: Function,
    errorFunc: Function
  ) => {
    set({ status: StateStatus.PENDING });
    const res = await post<null, LoginResponse | null>(
      `/auth/oauth/login?code=${code}&provider=${provider}`,
      null
    );
    if (res.status === ResponseStatus.OK) {
      JwtTokenUtils.setToken((res.data as LoginResponse).accessToken);
      set({
        status: StateStatus.SUCCESS,
      });
      completeFunc();
    } else {
      const error = res.message;
      alert(error);
      set({
        error: null,
        status: StateStatus.FAILURE,
      });
      errorFunc();
    }
  },
}));
