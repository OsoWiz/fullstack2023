import { useState } from "react";
const LoginForm = ({
  handleLogin,
  handleSignup,
  username,
  password,
  setUsername,
  setPassword,
}) => {
  const [login, setLogin] = useState(true);

  const handleSubmit = async (event) => {
    if (login) {
      await handleLogin(event);
    } else {
      await handleSignup(event);
    }
  };
  return (
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
  );
};

export default LoginForm;
