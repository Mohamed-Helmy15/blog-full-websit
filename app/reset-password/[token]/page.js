import ResetPassword from "@/app/components/ResetPassword";
import React from "react";
export const metadata = {
  title: "Reset Password",
  scription: "Reset Password",
};
const page = ({ params }) => {
  return <ResetPassword token={params.token} />;
};

export default page;
