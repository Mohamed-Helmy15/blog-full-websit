"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { styles } from "../globals.css";
import img from "../server.png";
const Blog = (props) => {
  const [blog, setBlog] = useState({});
  const [employer, setEmployer] = useState({});
  const [sections, setSections] = useState([]);
  const [user, setUser] = useState({});
  const [free, setFree] = useState(1);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("currentUser")));
    axios
      .get(`https://helmy-blog-api.onrender.com/api/v1/blogs/${props.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setBlog(res.data.data.blog);
        setEmployer(res.data.data.blog.author);
        setSections(res.data.data.blog.sections);
        setFree(true);
      })
      .catch((err) => {
        setFree(false);
      });
  }, []);
  return (
    <div>
      {free ? (
        <>
          <div className="header">
            <div className="title">
              <h1>{blog.title}</h1>
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
            <div className="author">
              <p>
                Created by{" "}
                <span
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {employer.firstName} {employer.lastName}
                </span>
              </p>
            </div>
          </div>
          {sections.map((section) => {
            return (
              <div className="section" key={section.id}>
                <h1>{section.title}</h1>
                {section.image && (
                  <div className="image">
                    <img
                      // src={`https://helmy-blog-api.onrender.com/img/sections/${section.image}`}
                      src={img}
                      alt="image"
                      style={{ width: "90%", height: "400px" }}
                    />
                  </div>
                )}
                <p>{section.description}</p>
              </div>
            );
          })}
        </>
      ) : (
        <div className="section">
          <SentimentVeryDissatisfiedIcon
            style={{
              fontSize: "100px",
              display: "block",
              margin: "10px auto",
            }}
          />
          <p
            style={{
              textAlign: "center",
            }}
          >
            We are Sorry! This Blog is not Free for normal users. please contact
            us at <strong>+201150870355</strong> or send an Email at{" "}
            <strong>mohamedhelmy1531@gmail.com</strong> to be a partner.
          </p>
        </div>
      )}
    </div>
  );
};

export default Blog;
