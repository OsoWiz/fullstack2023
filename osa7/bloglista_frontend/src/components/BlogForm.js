import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import blogService from "../services/blogs";
import { useDispatchNotification } from "../context/NotificationContext";
import { useUser } from "../context/UserContext";

const BlogForm = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatchNotification();

  const newBlogMutation = useMutation(blogService.create, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("blogs");
      dispatch({
        type: "SET_NOTIFICATION",
        payload: `New blog ${data.title} added`,
      });
    },
    onError: (error) => {
      dispatch({
        type: "SET_NOTIFICATION",
        payload: `Adding a blog failed: ${error}`,
      });
    },
  });
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [showForm, setShowForm] = useState(false);
  const user = useUser();

  const handleBlogSubmit = async (event) => {
    event.preventDefault();

    const blogToBeCreated = {
      title: title,
      author: author,
      url: url,
    };

    newBlogMutation.mutate(blogToBeCreated);
    setTitle("");
    setAuthor("");
    setUrl("");
    setShowForm(false); // hide the form after posting
  };

  if (user === null) {
    return null;
  } else if (!showForm) {
    return (
      <div>
        <button onClick={() => setShowForm(true)}>create new blog</button>
      </div>
    );
  } else {
    return (
      <div>
        <form onSubmit={handleBlogSubmit}>
          <div>
            title:
            <input
              type="text"
              value={title}
              name="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            author:
            <input
              type="text"
              value={author}
              name="Author"
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div>
            url:
            <input
              type="text"
              value={url}
              name="Url"
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <button type="submit" name="Createblog">
            create
          </button>
        </form>
        <button onClick={() => setShowForm(false)}>cancel</button>
      </div>
    );
  }
};

export default BlogForm;
