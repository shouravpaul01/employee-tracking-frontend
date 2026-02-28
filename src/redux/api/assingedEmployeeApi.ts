import { baseApi } from "@/redux/api/baseApi";

export const assignedEmployeeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Assign an employee to a project
    assignEmployee: builder.mutation({
      query: (data) => ({
        url: "/assigned-employee",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AssignedEmployee", "Project"],
    }),

    // Update check-in/out or break times
    updateAttendanceTime: builder.mutation({
      query: ({ id, status }) => ({
        url: `/assigned-employee/update-attendance-time/${id}?status=${status}`,
        method: "PATCH",
      
      }),
      invalidatesTags: ["AssignedEmployee"],
    }),

    // Get assigned projects with optional query params
    // Infinite query version for assigned projects
    getAssignedProjectsInfinite: builder.infiniteQuery({
      query({ pageParam = 1, queryArg }) {
        console.log(queryArg, "redux");
        return {
          url: "/assigned-employee/assigned-projects",
          method: "GET",
          params: {
            page: pageParam,
            limit: queryArg?.limit || 10,
            date: queryArg?.date,
            status: queryArg?.status,
            searchTerm: queryArg?.searchTerm,
          },
        };
      },
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
          // If last page has 'limit' items, assume next page exists
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
      providesTags: ["AssignedEmployee"],
    }),
    getAssignedProjects: builder.query({
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
          url: "/assigned-employee/assigned-projects",
          method: "GET",
          params,
        };
      },
      providesTags: ["AssignedEmployee"],
    }),
    getSingleAssignedProject: builder.query({
      query: (id: string) => ({
        url: `/assigned-employee/single-assigned-employee/${id}`,
        method: "GET",
      }),
      providesTags: ["AssignedEmployee"],
    }),
    getRecentEntries: builder.query({
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
          url: "/assigned-employee/recent-entries-with-summery",
          method: "GET",
          params,
        };
      },
      providesTags: ["AssignedEmployee"],
    }),
    updateAssignedEmployeeRole: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assigned-employee/${id}/role`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["AssignedEmployee"],
    }),
  }),
});

export const {
  useAssignEmployeeMutation,
  useUpdateAttendanceTimeMutation,
  useGetAssignedProjectsInfiniteInfiniteQuery,
  useGetAssignedProjectsQuery,
  useUpdateAssignedEmployeeRoleMutation,
  useGetRecentEntriesQuery,
  useGetSingleAssignedProjectQuery
} = assignedEmployeeApi;
