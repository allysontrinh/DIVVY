import axios from "axios";

export const addFriend = async (friendID, receiptID) => {
    try {
      // Update the friend's participating events
      const response = await axios.put(
        `https://divvy-8y34.onrender.com/api/users/userID/${friendID}`,
        {
          $push: {
            "events.$.participating": {
              eventID: 342, // Ensure this event exists in the events array
              receiptID: receiptID,
              status: "in-progress",
              photos: []
            }
          }
        }
      );
      console.log("Friend's events updated:", response.data);
    } catch (error) {
      console.error("Error updating friend's events:", error.response ? error.response.data : error.message);
    }
  
    try {
      // Update the receipt's users
      const response = await axios.put(
        `https://divvy-8y34.onrender.com/api/receipts/receiptID/${receiptID}`,
        {
          $push: { users: friendID }
        }
      );
      console.log("Receipt's users updated:", response.data);
    } catch (error) {
      console.error("Error updating receipt users:", error.response ? error.response.data : error.message);
    }
  };