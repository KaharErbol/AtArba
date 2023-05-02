import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



export const authApi = createApi({
  reducerPath: 'authentication',
  tagTypes: ['Token'],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SAMPLE_SERVICE_API_HOST,
    credentials: 'include',
  }),
  endpoints: builder => ({
    login: builder.mutation({
      query: info => {
        let formData = null;
        if (info instanceof HTMLElement) {
          formData = new FormData(info);
        } else {
          formData = new FormData();
          formData.append('username', info.username);
          formData.append('password', info.password);
        }
        return {
          url: '/token',
          method: 'post',
          body: formData,
        };
      },
      invalidatesTags: ['Token'],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(authApi.endpoints.getToken.initiate());
        } catch (e) {
          return;
        }
      },
    }),
    getToken: builder.query({
      query: () => ({
        url: '/token',
      }),
      providesTags: ['Token'],
    }),
    signUp: builder.mutation({
      query: (data) => ({
        url: '/accounts',
        body: data,
        method: 'post',
        credentials: 'include',
      }),
      invalidatesTags: ['Token'],
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: '/token',
        method: 'delete',
      }),
      invalidatesTags: ['Token']
,    }),
  }),
});

export const { 
  useLoginMutation,
  useGetTokenQuery,
  useSignUpMutation,
  useLogoutUserMutation, 
} = authApi;