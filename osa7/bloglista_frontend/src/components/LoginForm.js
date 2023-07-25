import { useState } from "react";
import { useMutation } from "react-query";
import loginService from "../services/login";
import { useDispatchNotification } from "../context/NotificationContext";
import { useDispatchUser } from "../context/UserContext";
const LoginForm = () => {
  const [login, setLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatchUser = useDispatchUser();

  const notifDispatch = useDispatchNotification();

  const loginMutation = useMutation(loginService.login, {
    onSuccess: (data) => {
      notifDispatch({
        type: "SET_NOTIFICATION",
        payload: `User ${data.username} logged in!`,
      });
      dispatchUser({ type: "LOGIN", payload: data });
    },
    onError: (error) => {
      notifDispatch({
        type: "SET_NOTIFICATION",
        payload: `False credentials: ${error}`,
      });
    },
  });

  const newUserMutation = useMutation(loginService.signup, {
    onSuccess: (data) => {
      notifDispatch({
        type: "SET_NOTIFICATION",
        payload: `New user ${data.username} signed up!`,
      });
      dispatchUser({ type: "LOGIN", payload: data });
    },
    onError: (error) => {
      notifDispatch({
        type: "SET_NOTIFICATION",
        payload: `Sign up failed`,
      });
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (login) {
      loginMutation.mutate({ username, password });
    } else {
      newUserMutation.mutate({ username, password });
    }
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" name="login" onClick={() => setLogin(true)}>
          login
        </button>
        <button type="submit" onClick={() => setLogin(false)}>
          sign up
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
