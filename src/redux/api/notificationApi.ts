import { baseApi } from "@/redux/api/baseApi";

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllMyNotifications: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          Object.entries(args).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== "") {
              params.append(key, value.toString());
            }
          });
        }

        return {
          url: "/notifications",
          method: "GET",
          params,
        };
      },
      providesTags: ["Notifications"],
    }),
  }),
});

export const { useGetAllMyNotificationsQuery } = notificationApi;
