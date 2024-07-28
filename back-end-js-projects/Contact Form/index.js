const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://hans:yoxlama123@kellerdb.a8bvub2.mongodb.net/?retryWrites=true&w=majority&appName=kellerdb";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db;
async function connectToDatabase() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    db = client.db("kellerdb"); // Assign the database instance after successful connection
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
}

connectToDatabase();

app.use(express.json());

// For serving static HTML files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Middleware to ensure DB connection
function ensureDbConnection(req, res, next) {
  if (!db) {
    return res.status(503).send("Database not connected");
  }
  req.db = db;
  next();
}

app.get("/", (req, res) => {
  res.set({
    "Allow-access-Allow-Origin": "*",
  });

  return res.redirect("index.html");
});

app.post("/formFillUp", ensureDbConnection, async (req, res) => {
  const { name, reason, email, phone, city, state, addressline } = req.body;

  const data = {
    name,
    reason,
    email,
    phone,
    city,
    state,
    addressline,
  };

  try {
    const collection = req.db.collection("users");
    await collection.insertOne(data);
    console.log("Data inserted successfully!");
    return res.redirect("formSubmitted.html");
  } catch (err) {
    console.error("Failed to insert data", err);
    res.status(500).send("Internal Server Error");
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`The application started successfully on port ${port}`);
});
