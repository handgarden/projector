import { create } from "zustand";
import { StateStatus } from "../types/common/StateStatus.type";
import { post } from "../common/axios";
import { ResponseStatus } from "../types/api/RestTemplate.type";
import { JwtTokenUtils } from "../utils/JwtTokenUtils";
import { OAuthProvider } from "../gql/graphql";

type OAuthRegisterStore = {
  status: StateStatus;
  error: null | string;
  register: (code: string, provider: OAuthProvider) => Promise<void>;
  unregister: (provider: OAuthProvider) => Promise<void>;
};

export const useOAuthRegisterStore = create<OAuthRegisterStore>((set) => {
  return {
    status: StateStatus.INITIAL,
    error: null,
    register: async (code: string, provider: OAuthProvider) => {
      set({ status: StateStatus.PENDING });
      const accessToken = JwtTokenUtils.getToken();

      if (!accessToken) {
        set({
          status: StateStatus.FAILURE,
        });
        return;
      }

      const res = await post<null, void>(
        `/auth/oauth/register?code=${code}&provider=${provider}`,
        null,
        accessToken
      );
      if (res.status === ResponseStatus.OK) {
        set({
          status: StateStatus.SUCCESS,
        });
      } else {
        const error = res.message;
        set({ error, status: StateStatus.FAILURE });
      }
    },
    unregister: async (provider: OAuthProvider) => {
      set({ status: StateStatus.PENDING });
      const accessToken = JwtTokenUtils.getToken();

      if (!accessToken) {
        set({
          status: StateStatus.FAILURE,
        });
        return;
      }

      const res = await post<null, void>(
        `/auth/oauth/unregister?provider=${provider}`,
        null,
        accessToken
      );
      if (res.status === ResponseStatus.OK) {
        set({
          status: StateStatus.SUCCESS,
        });
      } else {
        const error = res.message;
        set({ error, status: StateStatus.FAILURE });
      }
    },
  };
});
