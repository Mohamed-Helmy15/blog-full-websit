import Blog from "../../components/Blog";
import React from "react";
export const metadata = {
  title: "blog",
};
const page = ({ params }) => {
  return <Blog id={params.id} />;
};

export default page;
