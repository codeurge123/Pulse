import { useEffect, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "../redux/userslice";
import { USER_API_END_POINT } from "../utils/constant";

export default function AuthHandler() {

    const { isAuthenticated, isLoading, getAccessTokenSilently, user } = useAuth0();
    const dispatch = useDispatch();

    const hasSentToken = useRef(false);

    useEffect(() => {

        // check login provider
        const provider = localStorage.getItem("auth_provider");

        // stop if login was not done using Google/Auth0
        if (provider !== "auth0") return;

        if (isLoading) return;
        if (!isAuthenticated) return;
        if (hasSentToken.current) return;

        const sendTokenToBackend = async () => {

            try {

                hasSentToken.current = true;

                const token = await getAccessTokenSilently();

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

                if (res?.data?.success) {
                    dispatch(getUser(res?.data?.data?.loggedInUser));
                }

            } catch (error) {
                console.log("Auth0 login failed:", error);
            }

        };

        sendTokenToBackend();

    }, [isAuthenticated, isLoading, getAccessTokenSilently, dispatch, user]);

    return null;
}