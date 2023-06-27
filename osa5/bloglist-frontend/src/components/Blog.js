import { useEffect, useState } from "react";
const Blog = ({ blog, user, likeBlog, removeBlog }) => {
  const [showInfo, setShowInfo] = useState(false);
  const [likes, setLikes] = useState(blog.likes);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
    borderRadius: 5,
  };

  useEffect(() => {
    setLikes(blog.likes);
  }, [blog.likes]);

  const like = async (event) => {
    event.preventDefault();
    blog.likes += 1;
    await likeBlog(blog);
    setLikes(blog.likes);
  };

  const remove = async (event) => {
    event.preventDefault();
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await removeBlog(blog);
    }
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}{" "}
      <button onClick={() => setShowInfo(!showInfo)}>
        {showInfo ? "hide" : "view"}{" "}
      </button>
      {showInfo && (
        <div>
          <p>{blog.url}</p>
          <p>
            likes {likes} <button onClick={like}>like</button>
          </p>
          <p>Adder: {blog.user.username}</p>
          {user && user.username === blog.user.username && (
            <button onClick={remove}>remove</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
