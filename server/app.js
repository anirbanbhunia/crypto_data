import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import cryptoRoutes from "./routes/cryptoRoutes.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

//routes
app.use('/api', cryptoRoutes)

app.use("/hi",(req,res) => {
    res.send("Hello")
})
app.use("*",(req,res) => {
    res.status(404).send("OOPS!! 404 page not found")
})

export default app