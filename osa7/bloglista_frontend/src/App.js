import { useEffect, useContext } from "react";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import NotificationContext from "./context/NotificationContext";
import UserContext from "./context/UserContext";

const App = () => {
  const [user, userDispatch] = useContext(UserContext);
  const [notif, dispatchNotif] = useContext(NotificationContext);

  useEffect(() => {
    const blogUser = window.localStorage.getItem("loggedBlogAppUser");
    if (blogUser) {
      const newUser = JSON.parse(blogUser);
      userDispatch({ type: "LOGIN", payload: newUser });
    }
  }, [userDispatch]);

  useEffect(() => {
    if (notif) {
      setTimeout(() => {
        dispatchNotif({ type: "CLEAR_NOTIFICATION" });
      }, 5000);
    }
  }, [notif, dispatchNotif]);

  if (!user) {
    return (
      <div>
        <Notification />
        <LoginForm />
      </div>
    );
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <Notification />
        <div style={{ textAlign: "left" }}>
          <p>{user.username} logged in</p>
          <button
            style={{ display: "inline-block" }}
            onClick={() => {
              window.localStorage.removeItem("loggedBlogAppUser");
              userDispatch({ type: "LOGOUT" });
              dispatchNotif({
                type: "SET_NOTIFICATION",
                payload: "Logged out",
              });
            }}
          >
            logout
          </button>
        </div>
        <h2 style={{ marginTop: "1rem" }}>create new</h2>
        <BlogForm />
        <BlogList />
      </div>
    );
  }
};

export default App;
