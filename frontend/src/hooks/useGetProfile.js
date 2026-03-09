import axios from "axios"
import { USER_API_END_POINT } from "../utils/constant"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getProfile } from "../redux/userslice"

const useGetProfile = (id) => {

    const dispatch = useDispatch();

    useEffect(() => {

        //  Stop if id is not available
        if (!id) return;

        const fetchMyProfile = async () => {
            try {
                const res = await axios.get(
                    `${USER_API_END_POINT}/profile/${id}`,
                    { withCredentials: true }
                )
                // console.log(res?.data?.data);
                dispatch(getProfile(res?.data?.data))

            } catch (error) {
                console.log(error)
            }
        }

        fetchMyProfile();

    }, [id]) // important dependency

}

export default useGetProfile;