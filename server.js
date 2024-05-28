import dotenv from "dotenv"
import connectDB from "./src/db/db.js"
import app from "./src/app.js"
dotenv.config()

connectDB()

const port = process.env.PORT

app.listen(3333, "192.168.77.113", ()=>{
    console.log("Server running on port", port)
})