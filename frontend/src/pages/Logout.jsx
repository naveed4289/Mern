import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { Navigate } from "react-router-dom";

export const Logout = () => {
  const { LogoutUser } = useAuth();
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  useEffect(() => {
    const performLogout = async () => {
      await LogoutUser();
      setIsLoggedOut(true); // Trigger redirection after logout
    };

    performLogout();
  }, [LogoutUser]);

  // Redirect to login page after logout
  if (isLoggedOut) {
    return <Navigate to="/login" />;
  }

  return null; // Render nothing while logging out
};
