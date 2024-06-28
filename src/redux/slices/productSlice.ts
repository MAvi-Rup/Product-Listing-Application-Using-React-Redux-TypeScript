import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./../../types/productType";

interface IProduct {
  products: Product | null;
}

const initialState: IProduct = {
  products: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
      state.products = action.payload;
    },
  },
});

export const { setSelectedProduct } = productSlice.actions;

export default productSlice.reducer;
