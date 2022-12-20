import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

enum orderEnum {
  relevance,
  priceMin,
  priceMax,
}

export interface SearchState {
  inputWords: Array<string>;
  filers: Object;
  order: orderEnum;
}

const initialState: SearchState = {
  inputWords: [],
  filers: {},
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
      state.inputWords = [];
      state.filers = {};
      state.order = orderEnum.relevance;
    },
    setInputWords: (state, action: PayloadAction<Array<string>>) => {
      state.inputWords = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { reset, setInputWords: setInputText } = searchSlice.actions;

export default searchSlice.reducer;
