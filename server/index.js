import app from "./app.js"
import dbConnect from "./dbConnection/db.js"

const port = process.env.PORT||8001

app.listen(port,async() => {
   try{
    await dbConnect()
    console.log(`Server is listening on: http://localhost:${port}`)
   }catch(err){
    console.log("error is :",err)
   }
})