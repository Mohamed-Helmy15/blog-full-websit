"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function ProtectedComponent(props) {
  const router = useRouter();

  useEffect(() => {
    if (!window.localStorage.getItem("token")) {
      router.push("/");
    }
  });
  // const isAuthenticated = true; // Replace with your authentication logic
  // const isAuthenticated = window.localStorage.getItem("token"); // Replace with your authentication logic

  // if (!isAuthenticated) {
  //   // If not authenticated, redirect to login page
  //   router.push("/");
  //   return null;
  // }

  return <div>{props.children}</div>;
}

export default ProtectedComponent;
