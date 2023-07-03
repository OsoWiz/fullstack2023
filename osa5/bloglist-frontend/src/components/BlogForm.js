import { useState } from "react";

const BlogForm = ({ user, sendBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleBlogSubmit = async (event) => {
    event.preventDefault();
    const blogToBeCreated = {
      title: title,
      author: author,
      url: url,
    };
    await sendBlog(blogToBeCreated);
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
