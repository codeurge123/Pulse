import axios from "axios"
import { TWEET_API_END_POINT } from "../utils/constant"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getAllTweets } from "../redux/tweetslice"

const useGetTweets = (id) => {

    const dispatch = useDispatch();

    useEffect(() => {

        //  Stop if id is not available
        if (!id) return;

        const fetchMyProfile = async () => {
            try {
                const res = await axios.get(
                    `${TWEET_API_END_POINT}/alltweets/${id}`,
                    { withCredentials: true }
                )
                console.log(res?.data?.data?.tweets);
                dispatch(getAllTweets(res?.data?.data?.tweets))

            } catch (error) {
                console.log(error)
            }
        }

        fetchMyProfile();

    }, [id]) // important dependency -> if not put this then page refresh karna hoga har bar to call this function

}

export default useGetTweets;