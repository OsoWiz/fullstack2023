import { createContext, useReducer, useContext } from "react";

const NotificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.payload;
    case "CLEAR_NOTIFICATION":
      return null;
    default:
      return state;
  }
};

const NotficationContext = createContext();

export const useDispatchNotification = () => {
  const [notif, dispatch] = useContext(NotficationContext);
  return dispatch;
};

export const NotificationContextProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(NotificationReducer, null);

  return (
    <NotficationContext.Provider value={[notification, dispatch]}>
      {children}
    </NotficationContext.Provider>
  );
};

export default NotficationContext;
