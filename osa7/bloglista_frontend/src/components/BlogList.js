import Blog from "./Blog";
import blogService from "../services/blogs";
import { useQuery } from "react-query";

const BlogList = () => {
  const {
    data: blogs,
    isLoading,
    error,
  } = useQuery("blogs", blogService.getAll);

  if (!isLoading) {
    return (
      <div>
        {blogs
          .sort((a, b) => (a.likes > b.likes ? -1 : 1))
          .map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
      </div>
    );
  } else {
    return <div>loading...</div>;
  }
};

export default BlogList;
