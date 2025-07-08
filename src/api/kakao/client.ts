import axios from "axios";

const API_BASE_URL = "https://dapi.kakao.com/";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `KakaoAK ${process.env.EXPO_PUBLIC_API_KEY}`,
    "Content-Type": "application/json",
  },
});
