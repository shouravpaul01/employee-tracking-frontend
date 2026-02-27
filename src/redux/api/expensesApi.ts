import { baseApi } from "@/redux/api/baseApi";

export const expensesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create a new expense (EMPLOYEE)
    createExpense: builder.mutation({
      query: (data) => ({
        url: "/expenses",
        method: "POST",
        body: data, // FormData for file upload
      }),
      invalidatesTags: ["Expenses"],
    }),

    // Infinite query for all expenses (ADMIN)
    getAllExpensesInfinite: builder.infiniteQuery({
      query({ pageParam = 1, queryArg }) {
        return {
          url: "/expenses",
          method: "GET",
          params: {
            page: pageParam,
            limit: queryArg?.limit ?? 10,
            status: queryArg?.status,      // optional filter
           
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

    // Infinite query for employee's own expenses
    getMyExpensesInfinite: builder.infiniteQuery({
      query({ pageParam = 1, queryArg }) {
        return {
          url: "/expenses/my-expenses",
          method: "GET",
          params: {
            page: pageParam,
            limit: queryArg?.limit ?? 10,
            status: queryArg?.status, // optional filter
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

    // Update expense status (ADMIN)
    updateExpenseStatus: builder.mutation({
      query: ({ id, status ,feedback}) => ({
        url: `/expenses/${id}/status?status=${status}`,
        method: "PATCH",
        body: { feedback },
      }),
      invalidatesTags: ["Expenses"],
    }),

    // Get single expense (EMPLOYEE or ADMIN)
    getSingleExpense: builder.query({
      query: (id: string) => ({
        url: `/expenses/${id}`,
        method: "GET",
      }),
      providesTags: ["Expenses"],
    }),
  }),
});

export const {
  useCreateExpenseMutation,
  useGetAllExpensesInfiniteInfiniteQuery,
  useGetMyExpensesInfiniteInfiniteQuery,
  useUpdateExpenseStatusMutation,
  useGetSingleExpenseQuery,
} = expensesApi;