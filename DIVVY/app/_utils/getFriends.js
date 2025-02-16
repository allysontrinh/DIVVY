import axios from "axios";

export const fetchFriends = async (setFriends, setLoading) => {
  try {
    if (setLoading) setLoading(true);
    const response = await axios.get(
      "https://divvy-8y34.onrender.com/api/users/friends/3"
    );
    setFriends(response.data);
  } catch (error) {
    console.error("Error fetching posts:", error);
  } finally {
    if (setLoading) setLoading(false);
  }
};
