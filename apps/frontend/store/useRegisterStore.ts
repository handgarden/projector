import { create } from "zustand";
import { StateStatus } from "../types/common/StateStatus.type";
import { ValidationError } from "../types/api/ValidationError.type";
import { RegisterRequest } from "../types/auth/RegisterRequest.type";
import { post } from "../common/axios";
import { ResponseStatus } from "../types/api/RestTemplate.type";

type RegisterStore = {
  status: StateStatus;
  error: ValidationError[];
  register: (data: RegisterRequest, onSuccess: () => void) => void;
};

export const useRegisterStore = create<RegisterStore>((set) => ({
  status: StateStatus.INITIAL,
  error: [],
  register: async (data: RegisterRequest, onSuccess: () => void) => {
    set({ status: StateStatus.PENDING });
    const res = await post<RegisterRequest, null | ValidationError[]>(
      "/auth/register",
      data
    );
    if (res.status === ResponseStatus.OK) {
      set({
        status: StateStatus.SUCCESS,
      });
      onSuccess();
    } else {
      const error = res.data;
      set({ error: error ?? [], status: StateStatus.FAILURE });
    }
  },
}));
