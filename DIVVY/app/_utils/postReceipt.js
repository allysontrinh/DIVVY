import axios from "axios";

export const postReceipt = async (setEventID, receiptID, userID, veryfiData) => {
    const eventID = Math.random()
    const reqBody = {
        receiptID: receiptID,
        eventID: eventID,
        totalPrice: veryfiData.total,
        pricePerUser: 0,
        priceRemaining: veryfiData.total,
        users: [userID],
        paid: [],
        items: veryfiData.line_items.map((item, index) => ({
          itemID: item.id,
          totalPrice: item.total,
          priceRemaining: item.total,
          pricePerUser: item.total,
        })),
        history: []
      };

    setEventID(eventID)
    try {
      const response = await axios.post(
        "http://divvy-8y34.onrender.com/api/receipts/",
        reqBody, {
            headers:{
                "Content-Type":"application/json",
            },
            withCredentials: true,
        }
      );
      console.log("Receipt uploaded:", response.data);
    } catch (error) {
      console.error("Error posting receipt:", error);
    }
  };