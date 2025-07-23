import axios from "axios";

export const aladinApi = axios.create({
  baseURL: "https://www.aladin.co.kr/ttb/api",
  params: {
    ttbkey: process.env.EXPO_PUBLIC_ALADIN_KEY,
    output: "JS",
  },
});
