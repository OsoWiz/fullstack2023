import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Blog from "./Blog";
import BlogForm from "./BlogForm";

// 5.13
test("renders content and the title of the blog", () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "Test Author",
    url: "http://localhost:1",
    likes: 0,
    user: {
      username: "Test User",
    },
  };

  const utils = render(<Blog blog={blog} />);

  expect(utils.container).toHaveTextContent(
    "Component testing is done with react-testing-library"
  );
  expect(utils.container).toHaveTextContent("Test Author");
});

// 5.14
test("When blog is rendered, only title and author are shown", () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "Test Author",
    url: "http://localhost:3000",
    likes: 0,
    user: {
      username: "Test User",
    },
  };

  const utils = render(<Blog blog={blog} />);

  expect(utils.container).toHaveTextContent(
    "Component testing is done with react-testing-library"
  );
  expect(utils.container).toHaveTextContent("Test Author");

  expect(utils.container).not.toHaveTextContent("http://localhost:1");
  expect(utils.container).not.toHaveTextContent("0");
});

test("clicking the button additionally displays url, likes and the user", async () => {
  const testUser = {
    username: "Test User",
  };

  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "Test Author",
    url: "http://localhost:1",
    likes: 0,
    user: {
      username: "Test User",
    },
  };

  const utils = render(<Blog blog={blog} user={testUser} />);
  const user = userEvent.setup();
  const button = screen.getByText("view");

  await user.click(button);

  expect(utils.container).toHaveTextContent("http://localhost:1");
  expect(utils.container).toHaveTextContent("0");
  expect(utils.container).toHaveTextContent("Test User");
});

// 5.15
test("clicking the like button two times calls the event handler twice", async () => {
  const testUser = {
    username: "Test User",
  };

  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "Test Author",
    url: "http://localhost:1",
    likes: 0,
    user: {
      username: "Test User",
    },
  };

  const mockHandler = jest.fn();

  const utils = render(
    <Blog blog={blog} user={testUser} likeBlog={mockHandler} />
  );

  const user = userEvent.setup();
  // we have to press view to open up the extra info
  const button1 = screen.getByText("view");
  await user.click(button1);

  const button2 = screen.getByText("like");
  await user.click(button2);
  await user.click(button2);

  expect(mockHandler.mock.calls).toHaveLength(2);
});

// 5.16
test("BlogForm calls the event handler with the right blog details", async () => {
  const testUser = {
    username: "Test User",
  };

  const user = userEvent.setup();
  const createBlog = jest.fn();

  const utils = render(<BlogForm user={testUser} sendBlog={createBlog} />);
  // first let's open up the form
  const showButton = screen.getByText("create new blog");
  await user.click(showButton);

  const inputs = screen.getAllByRole("textbox");
  const title = inputs[0];
  const author = inputs[1];
  const url = inputs[2];

  const blogInputs = {
    title: "Component testing is done with react-testing-library",
    author: "Test Author",
    url: "http://localhost:1",
  };

  await user.type(title, blogInputs.title);
  await user.type(author, blogInputs.author);
  await user.type(url, blogInputs.url);

  const submitButton = screen.getByText("create");
  await user.click(submitButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0]).toEqual(blogInputs);
});
