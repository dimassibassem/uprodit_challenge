import axios, {AxiosRequestHeaders} from "axios";
import { apiEndpoints } from "../../config";
import generateSignature from "../utils/signature";

const client = axios.create({
  baseURL: apiEndpoints.baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use(
  async (config) => {
    if (config.url) {
      const result = generateSignature(config.url);
      config.headers = { ...config.headers, Authorization: result } as AxiosRequestHeaders;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { client };
