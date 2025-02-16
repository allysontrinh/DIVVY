# DivvyAPI

DivvyAPI is a backend API designed for managing users, tickets, and receipts for a receipt-sharing/splitting application.

## 🚀 Features
- User management (Create, Read, Update, Delete)
- Ticket management (Create, Read)
- Receipt management (Create, Read)
- Built using **Node.js**, **Express.js**, and **MongoDB**

---

## 🛠 Setup & Installation

### **1⃣ Clone the repository**
```sh
git clone https://github.com/allysontrinh/DIVVY.git
```

### **2⃣ Install dependencies**
```sh
npm install
```

### **3⃣ Start the server**
```sh
node divvyAPI.js
```

The API will be available at: `http://localhost:PORT`

---

## 📌 API Endpoints

### **User Endpoints**

#### `GET /api/users`
- Retrieves a list of all users.
- **Response:** A JSON array containing all users.

#### `POST /api/users`
- Creates a new user.
- **Request Body:**  
  ```json
  {
    "userID": 123,
    "name": "John Doe",
    "friends": [456, 789],
    "iou": {
      "receivedTickets": [101, 102],
      "givenTickets": [201, 202]
    },
    "events": {
      "hosted": [{"eventID": 1, "receiptID": 10, "status": "pending", "photos": ["url1", "url2"]}],
      "participating": [{"eventID": 2, "receiptID": 20, "status": "paid", "photos": ["url3"]}]
    }
  }
  ```
- **Response:** The created user object.

#### `GET /api/users/userID/:userID`
- Retrieves a single user by their `userID`.
- **Response:** A JSON object containing the user's details.

#### `PUT /api/users/:userID`
- Updates a user’s details by their `userID`.
- **Response:** The updated user object.

#### `DELETE /api/users/:userID`
- Deletes a user by their `userID`.
- **Response:**  
  ```json
  { "message": "User deleted" }
  ```

---

### **Ticket Endpoints**

#### `GET /api/tickets`
- Retrieves a list of all tickets.
- **Response:** A JSON array containing all tickets.

#### `POST /api/tickets`
- Creates a new ticket.
- **Request Body:**  
  ```json
  {
    "ticketID": 1001,
    "giver": {"userID": 123},
    "receiver": {"userID": 456},
    "type": "concert",
    "paid": true
  }
  ```
- **Response:** The created ticket object.

#### `GET /api/tickets/ticketID/:ticketID`
- Retrieves a single ticket by its `ticketID`.
- **Response:** A JSON object containing the ticket details.

---

### **Receipt Endpoints**

#### `GET /api/receipts`
- Retrieves a list of all receipts.
- **Response:** A JSON array containing all receipts.

#### `POST /api/receipts`
- Creates a new receipt.
- **Request Body:**  
  ```json
  {
    "receiptID": 2001,
    "eventID": 3001,
    "totalPrice": 100.50,
    "pricePerUser": 25.13,
    "priceRemaining": 50.25,
    "users": [123, 456, 789],
    "paid": [123],
    "items": [
      {"itemID": 1, "totalPrice": 20.00, "priceRemaining": 10.00, "pricePerUser": 5.00}
    ],
    "history": [
      {"userID": 123, "paymentAmount": 25.00, "date": "2025-02-15"}
    ]
  }
  ```
- **Response:** The created receipt object.

#### `GET /api/receipts/receiptID/:receiptID`
- Retrieves a single receipt by its `receiptID`.
- **Response:** A JSON object containing the receipt details.

---

## 🔗 Deployment

The API is hosted on Render and can be accessed at:  
[https://divvy-8y34.onrender.com](https://divvy-8y34.onrender.com)

---

## 👩‍💻 Contact
For any questions or issues, feel free to reach out!

👤 **Carey Pope**  
📧 Email: `popedidy@gmail.com`  
🐙 GitHub: [github.com/clpope](https://github.com/clpope)



