import axios from "axios";

export const fetchFriends = async (userID, setFriends, setLoading) => {
  try {
    if (setLoading) setLoading(true);
    const response = await axios.get(
      `http://divvy-8y34.onrender.com/api/users/friends/${userID}`, {
        headers:{
            "Content-Type":"application/json",
        },
        withCredentials: true,
    }
    );
    setFriends(response.data);
  } catch (error) {
    console.error("Error fetching posts:", error);
  } finally {
    if (setLoading) setLoading(false);
  }
};
