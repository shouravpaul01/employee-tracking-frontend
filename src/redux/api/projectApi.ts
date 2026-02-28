import { baseApi } from "@/redux/api/baseApi";

export const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProject: builder.mutation({
      query: (data) => ({
        url: "/projects",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Project"],
    }),
    getAllProjects: builder.query({
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
          url: "/projects",
          method: "GET",
          params,
        };
      },
      providesTags: ["Project"],
    }),
    // Infinite query version with filters
    getAllProjectsInfinite: builder.infiniteQuery({
      query({ pageParam = 1, queryArg }) {
        return {
          url: "/projects",
          method: "GET",
          params: {
            page: pageParam,
            limit: queryArg?.limit ?? 10,
            status: queryArg?.status,
            searchTerm: queryArg?.searchTerm,
          },
        };
      },
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
          // If last page has 10 items, assume next page exists
          if (lastPage?.data?.length === 10) return (lastPageParam || 1) + 1;
          return undefined;
        },
        getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
          return firstPageParam && firstPageParam > 1
            ? firstPageParam - 1
            : undefined;
        },
      },
      providesTags: ["Project"],
    }),

    getSingleProject: builder.query({
      query: (id: string) => ({
        url: `/projects/${id}`,
        method: "GET",
      }),
      providesTags: ["Project"],
    }),

    updateProject: builder.mutation({
      query: ({ id, data }) => ({
        url: `/projects/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Project"],
    }),

    deleteProject: builder.mutation({
      query: (id: string) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Project"],
    }),
     updateProjectMedia: builder.mutation({
      query: ({ id, data }) => {
       

        return {
          url: `/projects/${id}/media`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["Project"],
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useGetAllProjectsQuery,
  useGetAllProjectsInfiniteInfiniteQuery,
  useGetSingleProjectQuery,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useUpdateProjectMediaMutation,
} = projectApi;
