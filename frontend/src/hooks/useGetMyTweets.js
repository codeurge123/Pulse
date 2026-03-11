import axios from "axios"
import { TWEET_API_END_POINT } from "../utils/constant"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllTweets, getRefresh } from "../redux/tweetslice"
import toast from "react-hot-toast"
import store from "../redux/store"
import { RiDualSim1Fill } from "react-icons/ri"

const useGetTweets = (id) => {

    const dispatch = useDispatch();
    const { refresh, isActive } = useSelector(store => store.tweet);

    //  Stop if id is not available

    const fetchMyProfile = async () => {
        if (!id) return;
        // alert("insiide for you")
        try {
            const res = await axios.get(
                `${TWEET_API_END_POINT}/alltweets/${id}`,
                { withCredentials: true }
            )
            // console.log(res?.data?.data?.tweets);
            console.log(res);
            dispatch(getAllTweets(res?.data?.data?.tweets))
            // dispatch(getRefresh());
            // if(res?.data?.success) {
            //     toast.success(res?.data?.message)
            // }

        } catch (error) {
            console.log(error)
        }
    }

    const followingTweets = async () => {
        // alert("inside following")
        try {
            const res = await axios.get(`${TWEET_API_END_POINT}/followingtweets`, {
                withCredentials: true
            })
            console.log(res);
            dispatch(getAllTweets(res?.data?.data?.tweets));
            // if (res?.data?.success) {
            //     toast.success(res?.data?.message);
            // }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if(isActive) fetchMyProfile();
        else followingTweets();

    }, [id, refresh]) // important dependency -> if not put this then page refresh karna hoga har bar to call this function

}

export default useGetTweets;