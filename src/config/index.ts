import { QueryCache, QueryClient } from "@tanstack/react-query";
import {AxiosError} from "axios";

export const apiEndpoints = {
  baseURL: "https://api.uprodit.com",
  search: `/v1/search/all?usecase=${import.meta.env.VITE_USE_CASE}`,
  image: "/v2/profile/picture/f",
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
  queryCache: new QueryCache({
    onError: (error , query ) => {
      if (query.state.data !== undefined) {
        console.error(`Something went wrong: ${(error as AxiosError).message}`);
      }
    },
  }),
});
