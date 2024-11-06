import express from "express"
import { fetchAndStoreData, getAllData } from "../controller/cryptoController.js"

const cryptoRoutes = express.Router()

cryptoRoutes.get("/fetch-storedata",fetchAndStoreData)
cryptoRoutes.get("/getdata",getAllData)

export default cryptoRoutes