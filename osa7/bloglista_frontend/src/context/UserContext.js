import { createContext, useReducer, useContext } from "react";

const UserReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      window.localStorage.setItem(
        "loggedBlogAppUser",
        JSON.stringify(action.payload)
      );
      return action.payload;
    case "LOGOUT":
      window.localStorage.removeItem("loggedBlogAppUser");
      return null;
    default:
      return state;
  }
};

const UserContext = createContext();

export const useUser = () => {
  const ctx = useContext(UserContext);
  return ctx[0];
};

export const useDispatchUser = () => {
  const ctx = useContext(UserContext);
  return ctx[1];
};

export const UserContextProvider = ({ children }) => {
  const [user, userDispatch] = useReducer(UserReducer, null);

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
