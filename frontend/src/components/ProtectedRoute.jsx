import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {

  const { user } = useSelector((store) => store.user);
  const { isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    console.log("Redux user:", user);
    console.log("Auth0 authenticated:", isAuthenticated);
    console.log("Auth0 loading:", isLoading);
    if (!user && !isAuthenticated && !isLoading) {
      toast.error("Firstly Please SignIn");
    }
  }, [user, isAuthenticated, isLoading]);

  // wait for auth0 to finish checking session
  if (isLoading) {
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

  // allow if redux user OR auth0 authenticated
  if (!user && !isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }

  return children;
}