import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const itemsApi = createApi({
    reducerPath: 'items',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_SAMPLE_SERVICE_API_HOST,
    }),
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