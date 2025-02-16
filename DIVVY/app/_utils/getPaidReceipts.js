import axios from "axios";

// Function to fetch receipts for a user
export const fetchReceipts = async (userID, setUserData, setReceipts, setLoading) => {
  try {
    if (setLoading) setLoading(true);

    const response = await axios.get(
      `https://divvy-8y34.onrender.com/api/users/userID/3`
    );

    console.log("API Response:", response.data); // Debugging line

    const userData = response.data;

    // Ensure events and participating exist before filtering
    if (!userData.events || !userData.events.participating) {
      console.error("Error: Events data is missing or malformed", userData.events);
      setUserData(userData);
      setReceipts([]); // Set receipts to an empty array to prevent further errors
      return;
    }

    const paidReceipts = userData.events.participating
      .filter(event => event.status === "paid")
      .map(event => ({
        receiptID: event.receiptID,
        eventID: event.eventID,
        photos: event.photos,
        status: event.status
      }));

    setUserData(userData);
    setReceipts(paidReceipts);

  } catch (error) {
    console.error("Error fetching receipts:", error);
  } finally {
    if (setLoading) setLoading(false);
  }
};
