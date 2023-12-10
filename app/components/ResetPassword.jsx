"use client";
import { Alert, Box, Button, Stack, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import React, { useState } from "react";
import axios from "axios";
import { styles } from "../globals.css";
import { useRouter } from "next/navigation";
const ResetPassword = ({ token }) => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState(false);
  const [state, setState] = useState("success");

  const resetPasswordSchema = yup.object().shape({
    password: yup.string().required("required"),
    confirmPassword: yup.string().required("required"),
  });

  const initialValuesResetPassword = {
    password: "",
    confirmPassword: "",
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    axios
      .post(
        `https://helmy-blog-api.onrender.com/api/v1/users/reset-password/${token}`,
        values
      )
      .then((res) => {
        setState("success");
        setMessage(`Password has been updated successfully`);
        setAlert(true);
        setTimeout(() => {
          router.push("/");
        }, 1500);
      })
      .catch((err) => {
        setState("error");
        setMessage("Invalid URL");
        setAlert(true);
        setTimeout(() => {
          router.push("/forgot-password");
          setAlert(false);
        }, 5000);
      });
  };
  return (
    <Formik
      onSubmit={handleFormSubmit}
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
        <div className="form-wrapper">
          {alert && (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert variant="filled" severity={state}>
                {message}
              </Alert>
            </Stack>
          )}
          <div className="overlay">
            <p>Reset The Password</p>
            <div className="wrap-form">
              <form
                onSubmit={handleSubmit}
                // style={{
                //   background:
                //     localStorage.getItem("theme") === "dark" && "black",
                // }}
              >
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  // sx={{
                  //   "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                  // }}
                >
                  <TextField
                    label="Password"
                    type="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    error={
                      Boolean(touched.password) && Boolean(errors.password)
                    }
                    helperText={touched.password && errors.password}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    label="Confirm Password"
                    type="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.confirmPassword}
                    name="confirmPassword"
                    error={
                      Boolean(touched.confirmPassword) &&
                      Boolean(errors.confirmPassword)
                    }
                    helperText={
                      touched.confirmPassword && errors.confirmPassword
                    }
                    sx={{ gridColumn: "span 4" }}
                  />
                </Box>
                <Box>
                  <Button
                    fullWidth
                    type="submit"
                    sx={{
                      m: "2rem 0",
                      p: "1rem",
                    }}
                  >
                    Reset the Password
                  </Button>
                </Box>
              </form>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default ResetPassword;
