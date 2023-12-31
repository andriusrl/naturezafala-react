import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { user as userStorage } from "../../config/localStorage/localStorage";

interface UserState {
  token: string | null;
  name: string | null;
  type: number | null;
  lat: number | null;
  long: number | null;
  latMark: number | null;
  longMark: number | null;
  menuPollutionTypeStatus: boolean;
}

const initialState: UserState = {
  token: userStorage.getToken(),
  name: userStorage.getName(),
  type: userStorage.getType(),
  lat: null,
  long: null,
  latMark: null,
  longMark: null,
  menuPollutionTypeStatus: false,
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
    setType: (state, action: PayloadAction<number | null>) => {
      state.type = action.payload;
    },
    setLat: (state, action: PayloadAction<number | null>) => {
      state.lat = action.payload;
    },
    setLong: (state, action: PayloadAction<number | null>) => {
      state.long = action.payload;
    },
    setLatMark: (state, action: PayloadAction<number | null>) => {
      state.latMark = action.payload;
    },
    setLongMark: (state, action: PayloadAction<number | null>) => {
      state.longMark = action.payload;
    },
    setMenuPollutionTypeStatus: (state, action: PayloadAction<boolean>) => {
      state.menuPollutionTypeStatus = action.payload;
    },
  },
});

export const {
  setToken,
  setName,
  setType,
  setLat,
  setLong,
  setLatMark,
  setLongMark,
  setMenuPollutionTypeStatus,
} = userSlice.actions;
export const userReducer = userSlice.reducer;
