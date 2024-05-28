import mongoose from "mongoose";

export default (async ()=> {await mongoose.connect(process.env.MONGO_URI)
    .then(()=> console.log("Connected to MONGODB"))
    .catch((err)=>console.log("DB connection failed", err))
})