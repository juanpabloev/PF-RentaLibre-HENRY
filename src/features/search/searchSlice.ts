import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

enum orderEnum {
  relevance,
  priceMin,
  priceMax,
}

export interface SearchState {
  searchText: string;
  filers: { category: string };
  order: orderEnum;
}

const initialState: SearchState = {
  searchText: "",
  filers: { category: "" },
  order: orderEnum.relevance,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    reset: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.searchText = "";
      state.filers.category = "";
      state.order = orderEnum.relevance;
    },
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.filers.category = action.payload;
    },
    setOrder: (state, action: PayloadAction<orderEnum>) => {
      state.order = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { reset, setSearchText, setCategory, setOrder } =
  searchSlice.actions;
export const selectSearchText = (state: {
  persistedReducer: any;
  searchText: string;
}) => state.persistedReducer.searchState.searchText;
export const selectCategory = (state: {
  persistedReducer: any;
  category: string;
}) => state.persistedReducer.searchState.filers.category;
export const selectOrder = (state: {
  persistedReducer: any;
  order: orderEnum;
}) => state.persistedReducer.searchState.order;

export default searchSlice.reducer;
