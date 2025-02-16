import axios from "axios";

export const getActivity = async (userID, setParticipating, setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const response = await axios.get(
        `https://divvy-8y34.onrender.com/api/users/userID/${userID}`
      );
      const events = response.data.events; // Get events data
      const participating = events.participating || []; // Ensure we handle undefined
      // Filter the participating events with status "in-progress"
      const inProgressEvents = participating.filter(event => event.status === "in-progress");
  
      setParticipating(inProgressEvents); // Update the state with filtered events
    } catch (error) {
      console.error("Error fetching activity posts:", error);
    } finally {
      if (setLoading) setLoading(false);
    }
  };
  