import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {

  const { user } = useSelector((store) => store.user);

  if (!user) {
    toast.error("Firstly Please SignIn")
    return <Navigate to="/sign-in" />;
  }

  return children;
}