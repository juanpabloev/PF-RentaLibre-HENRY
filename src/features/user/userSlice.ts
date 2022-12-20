import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  token: string;
  favorites: Array<string>;
}

const initialState: UserState = {
  token: "",
  favorites: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<Array<string>>) => {
      state.favorites = action.payload;
    },
    addFavorite: (state, action: PayloadAction<string>) => {
      state.favorites.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setFavorites } = userSlice.actions;

export default userSlice.reducer;
