import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const categoriesApi = createApi({
    reducerPath: 'categories',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_SAMPLE_SERVICE_API_HOST,
    }),
    endpoints: builder => ({
        getCategories: builder.query({
            query: () => '/categories',
        }),
    }),
});

export const { useGetCategoriesQuery } = categoriesApi;