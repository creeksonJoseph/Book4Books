import React from "react";
import { Link } from "react-router-dom";

function SignupRedirect() {
  return (
    <Link
      to="/login"
      className="text-sm text-blue-500 hover:underline hover:text-blue-700"
    >
      Already a member? Log in
    </Link>
  );
}

export default SignupRedirect;
