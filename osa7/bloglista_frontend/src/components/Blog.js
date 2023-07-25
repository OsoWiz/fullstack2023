import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import blogService from "../services/blogs";
import { useUser } from "../context/UserContext";
import { useDispatchNotification } from "../context/NotificationContext";

const Blog = ({ blog }) => {
  const queryClient = useQueryClient();
  const [showInfo, setShowInfo] = useState(false);
  const user = useUser();
  const dispatch = useDispatchNotification();

  const removeBlogMutation = useMutation(blogService.remove, {
    onSuccess: () => queryClient.invalidateQueries("blogs"),
    onError: (error) => {
      dispatch({
        type: "SET_NOTIFICATION",
        payload: `Error occurred: ${error}`,
      });
    },
  });
  const likeBlogMutation = useMutation(blogService.like, {
    onSuccess: () => queryClient.invalidateQueries("blogs"),
  });

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
    borderRadius: 5,
  };

  const like = async (event) => {
    event.preventDefault();
    blog.likes += 1;
    likeBlogMutation.mutate(blog);
    dispatch({
      type: "SET_NOTIFICATION",
      payload: `Liked ${blog.title}`,
    });
  };

  const remove = async (event) => {
    event.preventDefault();
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlogMutation.mutate(blog);
      dispatch({
        type: "SET_NOTIFICATION",
        payload: `Removed ${blog.title}`,
      });
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
            likes {blog.likes} <button onClick={like}>like</button>
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
