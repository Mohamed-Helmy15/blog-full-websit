"use client";
import React, { useEffect, useState } from "react";
import { styles } from "../globals.css";
import axios from "axios";
import { Alert, Box, Button, Stack, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useRouter } from "next/navigation";
const Profile = () => {
  const router = useRouter();
  const [edit, setEdit] = useState(false);
  const [user, setUser] = useState({});
  const [currUser, setCurrUser] = useState({});
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState(false);
  const [state, setState] = useState("success");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordAlert, setPasswordAlert] = useState(false);
  const [passwordState, setPasswordState] = useState("success");

  const profileSchema = yup.object().shape({
    firstName: yup.string(),
    lastName: yup.string(),
    email: yup.string().email("Invalid email"),
  });

  const initialValuesProfile = {
    firstName: currUser.firstName,
    lastName: currUser.lastName,
    email: currUser.email,
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    axios
      .patch(
        `https://helmy-blog-api.onrender.com/api/v1/users/${currUser._id}}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setState("success");
        setMessage(`the Profile has been updated successfully`);
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 5000);
      })
      .catch((err) => {
        console.log(err);
        setState("error");
        setMessage(err.response.data.message);
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 5000);
      });
  };

  const resetPasswordSchema = yup.object().shape({
    oldPassword: yup.string().required("required"),
    newPassword: yup.string().required("required"),
    confirmNewPassword: yup.string().required("required"),
  });

  const initialValuesResetPassword = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const handlePasswordFormSubmit = async (values, onSubmitProps) => {
    axios
      .post(
        `https://helmy-blog-api.onrender.com/api/v1/users/update-password`,
        values,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setPasswordState("success");
        setPasswordMessage(`the password has been updated successfully`);
        setPasswordAlert(true);
        setTimeout(() => {
          setPasswordAlert(false);
        }, 5000);
      })
      .catch((err) => {
        console.log(err);
        setPasswordState("error");
        setPasswordMessage(err.response.data.message);
        setPasswordAlert(true);
        setTimeout(() => {
          setPasswordAlert(false);
        }, 5000);
      });
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("currentUser")));
    axios
      .get("https://helmy-blog-api.onrender.com/api/v1/blogs", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setBlogs(
          response.data.data.blogs.filter(
            (blog) =>
              blog.author._id ==
              JSON.parse(localStorage.getItem("currentUser")).id
          )
        );
      })
      .catch((err) => console.log(err));
    axios
      .get(
        `https://helmy-blog-api.onrender.com/api/v1/users/${
          JSON.parse(localStorage.getItem("currentUser"))._id
        }`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setCurrUser(response.data.data.user);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <div
        style={{
          padding: "20px 0",
        }}
      >
        <h1
          style={{
            padding: "0 0 20px 0",
            color: "#0755ff",
          }}
        >
          {currUser.firstName} {currUser.lastName} Profile
        </h1>
        <div className="info">
          {edit ? (
            <div
              style={{
                flex: "1",
              }}
            >
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValuesProfile}
                validationSchema={profileSchema}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  setFieldValue,
                  resetForm,
                }) => (
                  <div
                    className="form-edit"
                    style={{
                      marginBottom: "20px",
                    }}
                  >
                    {alert && (
                      <Stack sx={{ width: "100%" }} spacing={2}>
                        <Alert variant="filled" severity={state}>
                          {message}
                        </Alert>
                      </Stack>
                    )}
                    <h3>Change the User Information</h3>
                    <div className="edit-user-info">
                      <form className="edit-user" onSubmit={handleSubmit}>
                        <Box
                          display="grid"
                          gap="30px"
                          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        >
                          <TextField
                            label="First Name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.firstName}
                            name="firstName"
                            error={
                              Boolean(touched.firstName) &&
                              Boolean(errors.firstName)
                            }
                            helperText={touched.firstName && errors.firstName}
                            sx={{ gridColumn: "span 4" }}
                          />
                        </Box>
                        <Box
                          display="grid"
                          gap="30px"
                          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        >
                          <TextField
                            label="Last Name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.lastName}
                            name="lastName"
                            error={
                              Boolean(touched.lastName) &&
                              Boolean(errors.lastName)
                            }
                            helperText={touched.lastName && errors.lastName}
                            sx={{ gridColumn: "span 4" }}
                          />
                        </Box>
                        <Box
                          display="grid"
                          gap="30px"
                          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        >
                          <TextField
                            label="Email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name="email"
                            error={
                              Boolean(touched.email) && Boolean(errors.email)
                            }
                            helperText={touched.email && errors.email}
                            sx={{ gridColumn: "span 4" }}
                          />
                        </Box>
                        <Box>
                          <div className="edit">
                            <button
                              type="submit"
                              style={{
                                display: "block",
                                width: "100%",
                                outline: "none",
                                border: "none",
                                margin: "10px 0",
                              }}
                            >
                              <p>Submit</p>
                            </button>
                            <p onClick={() => setEdit(false)}>Cancel</p>
                          </div>
                        </Box>
                      </form>
                    </div>
                  </div>
                )}
              </Formik>
              <Formik
                onSubmit={handlePasswordFormSubmit}
                initialValues={initialValuesResetPassword}
                validationSchema={resetPasswordSchema}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  setFieldValue,
                  resetForm,
                }) => (
                  <div className="form-edit">
                    {passwordAlert && (
                      <Stack sx={{ width: "100%" }} spacing={2}>
                        <Alert variant="filled" severity={passwordState}>
                          {passwordMessage}
                        </Alert>
                      </Stack>
                    )}
                    <h3>Change the password</h3>
                    <div className="edit-user-info">
                      <form className="edit-user" onSubmit={handleSubmit}>
                        <Box
                          display="grid"
                          gap="30px"
                          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        >
                          <TextField
                            label="Old Password"
                            type="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.oldPassword}
                            name="oldPassword"
                            error={
                              Boolean(touched.oldPassword) &&
                              Boolean(errors.oldPassword)
                            }
                            helperText={
                              touched.oldPassword && errors.oldPassword
                            }
                            sx={{ gridColumn: "span 4" }}
                          />
                        </Box>
                        <Box
                          display="grid"
                          gap="30px"
                          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        >
                          <TextField
                            label="New Password"
                            type="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.newPassword}
                            name="newPassword"
                            error={
                              Boolean(touched.newPassword) &&
                              Boolean(errors.newPassword)
                            }
                            helperText={
                              touched.newPassword && errors.newPassword
                            }
                            sx={{ gridColumn: "span 4" }}
                          />
                        </Box>
                        <Box
                          display="grid"
                          gap="30px"
                          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        >
                          <TextField
                            label="Confirm New Password"
                            type="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.confirmPassword}
                            name="confirmNewPassword"
                            error={
                              Boolean(touched.confirmNewPassword) &&
                              Boolean(errors.confirmNewPassword)
                            }
                            helperText={
                              touched.confirmNewPassword &&
                              errors.confirmNewPassword
                            }
                            sx={{ gridColumn: "span 4" }}
                          />
                        </Box>
                        <Box>
                          <div className="edit">
                            <button
                              type="submit"
                              style={{
                                display: "block",
                                width: "100%",
                                outline: "none",
                                border: "none",
                                margin: "10px 0",
                              }}
                            >
                              <p>Submit</p>
                            </button>
                            <p onClick={() => setEdit(false)}>Cancel</p>
                          </div>
                        </Box>
                      </form>
                    </div>
                  </div>
                )}
              </Formik>
            </div>
          ) : (
            <>
              <div className="user-info">
                <p style={{ color: "#0755ff" }}>User Information</p>
                <p>
                  {currUser.firstName} {currUser.lastName}
                </p>
                <p>{currUser.email}</p>
                <p>{currUser.role}</p>
                <div className="date">
                  <h5>
                    Joined at{" "}
                    <span>
                      {new Date(currUser.created_at).toLocaleString("default", {
                        month: "long",
                      })}
                    </span>{" "}
                    <span>{new Date(currUser.created_at).getDate()}</span>{" "}
                    <span>{new Date(currUser.created_at).getFullYear()}</span>
                  </h5>
                </div>
              </div>
              <div className="edit">
                <p onClick={() => setEdit(true)}>Edit Profile</p>
              </div>
            </>
          )}
        </div>
      </div>
      <div>
        <h1
          style={{
            padding: "0 0 20px 0",
            color: "#0755ff",
          }}
        >
          {currUser.firstName} {currUser.lastName}'s Articles
        </h1>
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog.id} onClick={() => router.push(`/blogs/${blog.id}`)}>
              <div
                className="content"
                style={{
                  background: "#eee",
                  padding: "10px",
                  cursor: "pointer",
                }}
              >
                <div className="catTitle">
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
                      {currUser.firstName} {currUser.lastName}
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
            </div>
          ))
        ) : (
          <div
            className="content"
            style={{
              background: "#eee",
              padding: "10px",
              cursor: "pointer",
            }}
          >
            <div className="catTitle">
              <h2>
                No Blogs by {currUser.firstName} {currUser.lastName}
              </h2>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
