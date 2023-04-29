import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_SAMPLE_SERVICE_API_HOST,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().authentication.token;

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

export const itemsApi = createApi({
    reducerPath: 'items',
    baseQuery,
    tagTypes: ['ItemsList'],
    endpoints: builder => ({
        getItems: builder.query({
            query: () => '/items',
            providesTags: ['ItemsList'],
        }),
        createItem: builder.mutation({
            query: data => ({
                url: '/items',
                body: data,
                method: 'post',
            }),
            invalidatesTags: ['ItemsList'],
        }),
    }),
});

export const { useGetItemsQuery, useCreateItemMutation } = itemsApi; 