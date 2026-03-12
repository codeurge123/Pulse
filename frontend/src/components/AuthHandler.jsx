import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "../redux/userslice";
import toast from "react-hot-toast";
import { USER_API_END_POINT } from "../utils/constant";

export default function AuthHandler() {

    const { isAuthenticated, isLoading, getAccessTokenSilently, user } = useAuth0();
    const dispatch = useDispatch();

    useEffect(() => {

        if (isLoading) return;          // wait until Auth0 finishes checking session
        if (!isAuthenticated) return;   // user not logged in

        const sendTokenToBackend = async () => {

            try {

                console.log("Sending request to backend...");

                // get Auth0 access token
                const token = await getAccessTokenSilently();

                console.log("TOKEN:", token);
                console.log("AUTH0 USER:", user);

                const res = await axios.post(
                    `${USER_API_END_POINT}/auth0-login`,
                    {
                        email: user?.email,
                        name: user?.name
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                        withCredentials: true
                    }
                );

                console.log("BACKEND RESPONSE:", res);

                if (res?.data?.success) {
                    toast.success("Google login successful");

                    dispatch(getUser(res?.data?.data?.loggedInUser));
                }

            } catch (error) {

                console.log("Auth0 login failed");

                console.log("Full error:", error);
                console.log("Axios response:", error.response);
                console.log("Backend message:", error.response?.data);

            }

        };

        sendTokenToBackend();

    }, [isAuthenticated, isLoading, getAccessTokenSilently, dispatch, user]);

    return null;
}