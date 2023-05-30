import { useState, useEffect } from "react";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      console.log(user);
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
    }
  };

  useEffect(() => {
    const blogUser = window.localStorage.getItem("loggedBlogAppUser");
    if (blogUser) {
      const user = JSON.parse(blogUser);
      setUser(user);
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    // set error message to null in 5 sec whenever it's changed
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  }, [errorMessage]);

  if (user === null) {
    return (
      <div>
        <p>{errorMessage}</p>
        <h2>Log in to application</h2>
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      </div>
    );
  } else {
    return (
      <div>
        <div>
          <h2>blogs</h2>
          <p>{errorMessage}</p>
          <div style={{ textAlign: "left" }}>
            <p>{user.username} logged in</p>
            <button
              style={{ display: "inline-block" }}
              onClick={() => {
                window.localStorage.removeItem("loggedBlogAppUser");
                setUser(null);
                setErrorMessage("Logged out");
              }}
            >
              logout
            </button>
          </div>
        </div>
        <h2 style={{ marginTop: "1rem" }}>create new</h2>
        <BlogForm
          blogList={blogs}
          setBlogList={setBlogs}
          setError={setErrorMessage}
        />
        <BlogList blogs={blogs} />
      </div>
    );
  }
};

export default App;
