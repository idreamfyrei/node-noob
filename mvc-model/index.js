import express from "express";

import userRouter from "./routes/user.route.js";
import {connectMongoDB} from "./connection.js";


const app = express();
const PORT = process.env.PORT || 8000;

const main = async () => {
  await connectMongoDB();
}

main();
console.log("Connected to MongoDB");

//* Middleware
// get the data from POST request, creates a JS object of it, and attach it to req.body
app.use(express.urlencoded({ extended: false }));

//redirects request on /user to userRouter and adds the prefix of /user to all routes in CRUD
app.use('/api/users', userRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
