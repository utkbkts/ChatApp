import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = {
  user: user ? user : null,
};

export const AuthSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    Login: (state, action) => {
      state.user = action.payload;
    },
    Logout: (state) => {
      state.user = null;
      localStorage.removeItem("user")
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { Login,Logout,setUser } = AuthSlice.actions;
export default AuthSlice.reducer;
