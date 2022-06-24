import mongoose from "mongoose";

const mongoConnection = {
    isConnected: 0
}

export const connect = async()=>{


    await mongoose.connect(process.env.MONGO_URL || '')
}