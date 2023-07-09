import { createSlice } from "@reduxjs/toolkit";

const initialNotification = "";

const notificationSlice = createSlice({
  name: "notification",
  initialState: initialNotification,
  reducers: {
    setNotificationMessage: (state, action) => {
      return action.payload;
    },
  },
});

export const { setNotificationMessage } = notificationSlice.actions;
export const setNotification = (message, timeout) => {
  return async (dispatch) => {
    dispatch(setNotificationMessage(message));
    setTimeout(() => {
      dispatch(setNotificationMessage(""));
    }, timeout * 1000);
  };
};
export default notificationSlice.reducer;
