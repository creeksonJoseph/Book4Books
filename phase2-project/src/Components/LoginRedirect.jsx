import React from "react";
import { Link } from "react-router-dom";

function LoginRedirect() {
  return (
    <Link
      to="/signUp"
      className="text-sm text-blue-500 hover:underline hover:text-blue-700"
    >
      Not a member? Sign in now
    </Link>
  );
}
export default LoginRedirect;
