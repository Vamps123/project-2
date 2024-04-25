// Import necessary modules
const express = require('express');
const path = require('path');
const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyParser = require('body-parser'); // To parse request body

// Set up the Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse request body as JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection URI
const uri = "mongodb+srv://divyansh:Nainital1972@cluster0.pvxdl1b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.ejs')); 
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    await client.connect(); 

    const db = divyansh.db("divyansh"); 
    const usersCollection = db.verma("verma"); 

    const user = await usersCollection.findOne({ username, password });

    if (user) {
      res.send("Login successful!");
    } else {
      res.status(401).send("Invalid username or password."); 
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    res.status(500).send("Error connecting to MongoDB: " + error.message); 
  } finally {
    await client.close(); 
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
