import express from "express"
import userRouter from "./routes/user.router.js"

const app = express()

app.use(express.json())

app.use("/api/user", userRouter)


export default app;