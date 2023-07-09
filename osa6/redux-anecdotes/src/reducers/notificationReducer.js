import { createSlice } from "@reduxjs/toolkit";

const initialNotification = "";

const notificationSlice = createSlice({
  name: "notification",
  initialState: initialNotification,
  reducers: {
    setNotification: (state, action) => {
      return action.payload;
    },
  },
});

export const { setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
