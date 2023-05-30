import { useState } from "react";
import blogService from "../services/blogs";
const BlogForm = ({ blogList, setBlogList, setError }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleBlogSubmit = async (event) => {
    event.preventDefault();
    const blogToBeCreated = {
      title: title,
      author: author,
      url: url,
    };
    const newBlog = await blogService.create(blogToBeCreated);
    setBlogList(blogList.concat(newBlog));
    setError(`New blog ${newBlog.title} added`);
  };

  return (
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
        author :
        <input
          type="text"
          value={author}
          name="Author"
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div>
        url :
        <input
          type="text"
          value={url}
          name="Url"
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default BlogForm;
