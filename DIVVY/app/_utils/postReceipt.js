import axios from "axios";

export const postReceipt = async (receiptID, userID, veryfiData) => {
    const reqBody = {
        receiptID: receiptID,
        eventID:  Math.random(),
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

    try {
      const response = await axios.post(
        "https://divvy-8y34.onrender.com/api/receipts",
        reqBody
      );
      console.log("Receipt uploaded:", response.data);
    } catch (error) {
      console.error("Error posting receipt:", error);
    }
  };