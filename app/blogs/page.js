import React from "react";
import BlogsFetching from "../components/BlogsFetching";
import ProtectedComponent from "../components/ProtectedRoute";
export const metadata = {
  title: "All blogs",
};
const Blogs = () => {
  return (
    <ProtectedComponent>
      <h1 style={{ margin: "10px 0" }}>All blogs</h1>
      <BlogsFetching />
    </ProtectedComponent>
  );
};

export default Blogs;
