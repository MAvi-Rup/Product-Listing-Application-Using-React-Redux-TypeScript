import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./api/productApi";
import productReducer from "./slices/productSlice";

const store = configureStore({
  reducer: {
    product: productReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
