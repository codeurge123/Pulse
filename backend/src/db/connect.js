import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB = async () => {
    try {
        const dbInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log(`Connected to Database`, dbInstance.connection.host);
    }
    catch (error) {
        console.log(`Error while connecting with db : `, error);
        process.exit(1); // just to exit the function
    }
}

export default connectDB;