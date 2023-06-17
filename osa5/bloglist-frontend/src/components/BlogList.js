import Blog from "./Blog";
import blogService from "../services/blogs";

const BlogList = ({ blogs, user, setBlogs }) => {
  const removeBlog = async (blog) => {
    await blogService.remove(blog);
    const newBlogs = blogs.filter((b) => b.id !== blog.id);
    setBlogs(newBlogs);
  };

  return (
    <div>
      {blogs
        .sort((a, b) => (a.likes > b.likes ? -1 : 1))
        .map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} removeBlog={removeBlog} />
        ))}
    </div>
  );
};

export default BlogList;
