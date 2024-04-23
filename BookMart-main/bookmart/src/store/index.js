import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: false,
};
const loggedUserInitialState = {
  loggedUserData: [],
};

const loggedUserSlice = createSlice({
  name: "userLogged",
  initialState: loggedUserInitialState,
  reducers: {
    setUser(state, action) {
      state.loggedUserData = action.payload;
    },
    clearUser(state) {
      state.loggedUserData = [];
    },
  },
});

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    loggedUser: loggedUserSlice.reducer,
  },
});

export const authActions = authSlice.actions;
export const loggedUserActions = loggedUserSlice.actions;
export default store;
