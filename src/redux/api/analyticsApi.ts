import { baseApi } from "@/redux/api/baseApi";

export const analyticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
   

    getAdminOverview: builder.query({
      query: () => ({
        url: `/analytics/admin-dashboard-analytics`,
        method: "GET",
      }),
      providesTags: ["Analytics"],
    }),

   
  }),
});

export const {
useGetAdminOverviewQuery
} = analyticsApi;
