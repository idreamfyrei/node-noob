import express from "express";
import fs from "fs";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { timeStamp } from "console";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

//* Mongoose connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo Connected"))
  .catch((e) => console.log("Error:", e));

//* Connect to MongoDB
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

//* Mongoose Model
const User = mongoose.model("user", userSchema);

//* Middleware
// get the data from POST request, creates a JS object of it, and attach it to req.body
app.use(express.urlencoded({ extended: false }));

//* ROUTES
app.get("/", (req, res) => {
  res.send("Server is live");
});

// return user in the form of HTML
app.get("/users", async(req, res) => {
    const allUsers = await User.find({});
  const html = `
    <ul>
        ${allUsers.map((user) => `<li>${user.firstName}</li>`).join("")}
    </ul>
    `;
  res.send(html);
});

// Give JSON data in case user hit /api/users through mobile devices that doesn't support HTML rendering
app.get("/api/users", async(req, res) => {
    const allUsers = await User.find({});
  return res.json(allUsers);
});

// do get data for a specific user through dynamic routing (:id)
app.route("/api/users/:id")
.get(async(req, res) => {
  const user = await User.findById(req.params.id);
  res.send(user);
})
.patch(async(req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, {lastName: 'Chatko'});
    return res.json({status:'Success'});
})
.delete(async(req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    return res.json({status:'Deleted'});
})

//* Post
app.post("/api/users/", async (req, res) => {
  const body = req.body;

  if (!body.first_name || !body.last_name || !body.email) {
    return res.status(400).json({ msg: "All inputs are required" });
  }

  try {
    const result = await User.create({
      firstName: body.first_name,
      lastName: body.last_name,
      email: body.email,
    });
    console.log("User created:", result);
    return res.status(201).json({ msg: "Success" });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
});



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
