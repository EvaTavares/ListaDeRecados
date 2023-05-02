import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const loggedUserSlice = createSlice({
  name: 'loggedUser',
  initialState,
  reducers: {
    createLoggedUser(state, action) {
      return action.payload;
    },
    clearLoggedUser() {
      return initialState;
    }
  }
});

export const { createLoggedUser, clearLoggedUser } = loggedUserSlice.actions;
export default loggedUserSlice.reducer;
