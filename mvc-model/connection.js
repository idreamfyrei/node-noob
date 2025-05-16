import mongoose from "mongoose";


//* Mongoose connection
async function connectMongoDB(){
    return mongoose.connect(process.env.MONGO_URI);
}


export {connectMongoDB};