import mongoose from "mongoose";
import "dotenv/config";


export async function connectToMongoDB(){
    try{
        const MONGODB_URI = process.env.MONGODB_URI;

        if(MONGODB_URI == undefined){
            throw new Error;
        }
        const conn = await mongoose.connect(MONGODB_URI);
        console.log("MongoDB connected", conn.connection.host);
    } catch(error) {
        console.log("Error occurred", error);
        process.exit(1); //1 = failed 0 = means success
    }
}