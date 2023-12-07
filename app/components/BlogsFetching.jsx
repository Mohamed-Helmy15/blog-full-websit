"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import LockIcon from "@mui/icons-material/Lock";
import { styles } from "../globals.css";
import { Clear, Search } from "@mui/icons-material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/navigation";
const BlogsFetching = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    axios
      .get("https://blog-api-qjoh.onrender.com/api/v1/blogs", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setBlogs(response.data.data.blogs);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="blogs">
      <div className="search">
        <input
          type="text"
          placeholder="Search for a blog..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="icons">
          {search.length > 0 ? (
            <Clear
              style={{
                cursor: "pointer",
              }}
              onClick={() => setSearch("")}
            />
          ) : (
            <Search />
          )}
        </div>
      </div>
      {blogs
        .filter((blog) =>
          blog.title.toLowerCase().includes(search.trim().toLowerCase())
        )
        .map((blog) => {
          return (
            <div
              className="blog"
              key={blog.id}
              onClick={() => {
                router.push(`/blogs/${blog.id}`);
              }}
            >
              <div className="content">
                <div className="catTitle">
                  {/* <h3>{blog.category} Category</h3> */}
                  <h2>{blog.title}</h2>
                </div>
                <div className="author">
                  <p>
                    Created by{" "}
                    <span
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      {blog.author.firstName} {blog.author.lastName}
                    </span>
                  </p>
                </div>
                <div className="date">
                  <h5>
                    Established at{" "}
                    <span>
                      {new Date(blog.created_at).toLocaleString("default", {
                        month: "long",
                      })}
                    </span>{" "}
                    <span>{new Date(blog.created_at).getDate()}</span>{" "}
                    <span>{new Date(blog.created_at).getFullYear()}</span>
                  </h5>
                </div>
              </div>
              <div className="lock">
                {blog.is_paid === true &&
                JSON.parse(localStorage.getItem("currentUser")).role ===
                  "user" &&
                !JSON.parse(
                  localStorage.getItem("currentUser")
                ).freeBlogs.includes(blog.id) ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <LockIcon />
                    <p
                      style={{
                        color: "#0755ff",
                        fontWeight: "bold",
                      }}
                    >
                      {blog.price}.00 EGP
                    </p>
                  </div>
                ) : (
                  <p
                    style={{
                      color: "#0dc90d",
                      fontWeight: "bold",
                    }}
                  >
                    Free
                  </p>
                )}
              </div>
            </div>
          );
        })}
      <Stack spacing={2}>
        <Pagination
          count={blogs.length / 10 <= 1 ? 1 : Math.ceil(blogs.length / 10)}
        />
      </Stack>
    </div>
  );
};

export default BlogsFetching;
