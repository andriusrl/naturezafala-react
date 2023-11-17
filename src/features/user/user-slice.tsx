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
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setName: (state, action: PayloadAction<string | null>) => {
      state.name = action.payload;
    },
  },
});

export const { setToken, setName } = userSlice.actions;
export const userReducer = userSlice.reducer;
