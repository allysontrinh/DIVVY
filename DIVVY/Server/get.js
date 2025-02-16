const { MongoClient } = require('mongodb');

// Replace with your actual MongoDB connection string
const uri = "mongodb+srv://clpope:Quicksc0ped0@cluster0.kamrf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Initialize the MongoDB client
const client = new MongoClient(uri);

async function fetchSampleDocument() {
  try {
    // Connect to the MongoDB client
    await client.connect();
    
    // Access the 'DivvyDB' database
    const db = client.db("DivvyDB");
    console.log("Connected to database:", db.databaseName);
    
    // List all collections in the database to verify collection names
    const collections = await db.listCollections().toArray();
    console.log("Collections:", collections.map(c => c.name));
    
    // Choose one collection to query, e.g., "user", "tickets", or "receipts"
    const collection = db.collection("receipts"); // Change to "tickets" or "receipts" as needed

    // Get all documents to check if they exist in the collection
    const documents = await collection.find().toArray();
    if (documents.length === 0) {
      console.log("No documents found in the collection.");
    } else {
      console.log("Documents in collection:", JSON.stringify(documents, null, 2));
    }

    // Try retrieving one sample document
    const sampleDocument = await collection.findOne({});
    console.log("Sample Document:", JSON.stringify(sampleDocument, null, 2));
  } catch (error) {
    console.error("Error fetching document:", error);
  } finally {
    await client.close();
  }
}

fetchSampleDocument();
