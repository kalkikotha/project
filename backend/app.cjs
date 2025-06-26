const express = require("express");
const Session = require('./models/sessionModel.cjs'); // Import the Session model
const authRoutes = require("./routes/authRoutes.cjs");
const otpRoutes = require("./routes/otpRoutes.cjs");
const docRoutes = require("./routes/docRoutes.cjs");
const cors = require("cors"); // Import the CORS middleware
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken'); // Make sure to import the jsonwebtoken module

const app = express();
const port = 8000;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const uri =
  "mongodb+srv://kalki6309:2Y5XdW8RplGUI5m5@cluster0.o1rqdlq.mongodb.net/Users?retryWrites=true&w=majority&appName=Cluster0";
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // const userDB = client.db("User");
    // // Send a ping to confirm a successful connection
    // await userDB.command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
    await mongoose.connect(uri);
    await console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    // } finally {
    //   // Ensures that the client will close when you finish/error
    //   await client.close();
  }
}

app.use(express.json());
app.use(cors());
app.use("/api", authRoutes);
app.use("/api", otpRoutes);
app.use("/api", docRoutes);

// app.use(async (req, res, next) => {
//   const token = req.headers.authorization;
//   const payload = jwt.verify(token, "secret");
//   const session = await Session.findById(payload.sessionId);

//   if (!session) {
//     return res.status(401).json({ message: "Invalid session" });
//   }

//   req.session = session;

//   next();
// });

// run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  run().catch(console.dir);
});
