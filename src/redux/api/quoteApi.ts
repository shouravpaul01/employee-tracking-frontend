import { baseApi } from "@/redux/api/baseApi";

export const quoteApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendQuoteEmail: builder.mutation({
      query: ( data ) => {
        return {
          url: `/quote/send-email`,
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const { useSendQuoteEmailMutation } = quoteApi;
