import { baseApi } from "@/redux/api/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    // Infinite query for all expenses (ADMIN)
    getAllUsers: builder.infiniteQuery({
      query({ pageParam = 1, queryArg }) {
        return {
          url: "/users",
          method: "GET",
          params: {
            page: pageParam,
            limit: queryArg?.limit ?? 30,
          },
        };
      },
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
          if (lastPage?.data?.length === (lastPage?.limit ?? 10))
            return (lastPageParam || 1) + 1;
          return undefined;
        },
        getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
          return firstPageParam && firstPageParam > 1
            ? firstPageParam - 1
            : undefined;
        },
      },
      providesTags: ["Expenses"],
    }),
    getMe: builder.query({
      query: () => ({
        url: "/users/get-me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const { useGetAllUsersInfiniteQuery,useGetMeQuery } = userApi;
