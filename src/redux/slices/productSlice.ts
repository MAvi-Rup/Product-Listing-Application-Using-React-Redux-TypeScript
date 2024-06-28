import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../types/productType";

interface IProduct {
  products: Product[];
}

const initialState: IProduct = {
  products: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
});

export default productSlice.reducer;
