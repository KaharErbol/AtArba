import { configureStore } from '@reduxjs/toolkit';
import { itemsApi } from './itemsApi';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { categoriesApi } from './categoriesApi';
import { authApi } from './authApi';
import cartReducer from './cartSlice';
import counterReducer from './cartItemCounterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer,
    [itemsApi.reducerPath]: itemsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
                .concat(itemsApi.middleware)
                .concat(categoriesApi.middleware)
                .concat(authApi.middleware),

});


setupListeners(store.dispatch);