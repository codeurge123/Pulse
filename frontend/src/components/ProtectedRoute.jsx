import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }) {

  const { user } = useSelector((store) => store.user);
  const { isAuthenticated, isLoading } = useAuth0();

  const [checkingUser, setCheckingUser] = useState(true);

  // wait a little for redux user to load
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setCheckingUser(false);
      }, 600); 

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  useEffect(() => {
    if (!checkingUser && !user && !isAuthenticated) {
      toast.error("Firstly Please SignIn");
    }
  }, [checkingUser, user, isAuthenticated]);

  if (isLoading || checkingUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-5 p-10 rounded-2xl">
          <div className="w-14 h-14 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="text-gray-700 text-lg font-semibold">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
}




// There are many errors in this file have to work on this 