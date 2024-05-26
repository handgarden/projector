import axios, { AxiosError, RawAxiosRequestHeaders } from "axios";
import { ResponseStatus, RestResponse } from "../types/api/RestTemplate.type";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  timeout: 5000,
});

export const post = async <Req, Res>(
  url: string,
  body: Req,
  token?: string,
  type?: RawAxiosRequestHeaders["Content-Type"]
): Promise<RestResponse<Res | null>> => {
  try {
    const response = await axiosInstance.post<RestResponse<Res>>(
      url,
      body ?? {},
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": type ?? "application/json",
        },
      }
    );
    return response.data;
  } catch (e) {
    const res = (e as AxiosError<RestResponse<null>>).response?.data;
    if (!res) {
      return {
        status: ResponseStatus.SERVER_ERROR,
        message: "서버 오류",
        data: null,
      };
    }
    return res;
  }
};

export const get = async <Res>(
  url: string,
  token?: string
): Promise<RestResponse<Res | null>> => {
  try {
    const response = await axiosInstance.get<RestResponse<Res>>(url, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return response.data;
  } catch (e) {
    const res = (e as AxiosError<RestResponse<null>>).response?.data;
    if (!res) {
      return {
        status: ResponseStatus.SERVER_ERROR,
        message: "서버 오류",
        data: null,
      };
    }
    return res;
  }
};
