import axios from "axios"
import { USER_API_END_POINT } from "../utils/constant"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getOtherUser } from "../redux/userslice"

const useOtherUsers = (id) => {

    const dispatch = useDispatch();

    useEffect(() => {

        //  Stop if id is not available
        if (!id) return;

        const fetchOtherUsers = async () => {
            try {
                const res = await axios.get(
                    `${USER_API_END_POINT}/otherusers/${id}`,
                    { withCredentials: true }
                )
                // console.log(res?.data?.data); // -> just for testing
                dispatch(getOtherUser(res?.data?.data))

            } catch (error) {
                console.log(error)
            }
        }

        fetchOtherUsers();

    }, [id]) // important dependency

}

export default useOtherUsers;