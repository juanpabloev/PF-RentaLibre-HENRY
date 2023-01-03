import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  token: string;
  favorites: Array<any>;
}

const initialState: UserState = {
  token: "",
  favorites: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<Array<any>>) => {
      state.favorites = action.payload;
    },
    addFavorite: (state, action: PayloadAction<any>) => {
      state.favorites.push(action.payload);
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setFavorites, addFavorite, setToken } = userSlice.actions;
export const selectFavorites = (state: {
  persistedReducer: any;
  favorites: any;
}) => state.persistedReducer.userState.favorites;
export const selectToken = (state: { persistedReducer: any; token: string }) =>
  state.persistedReducer.userState.token;

export default userSlice.reducer;
