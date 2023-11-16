import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserState {
  token: string | null;
  name: string | null;
}

const initialState: UserState = {
  token: null,
  name: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const { setToken } = userSlice.actions;
export const userReducer = userSlice.reducer;
