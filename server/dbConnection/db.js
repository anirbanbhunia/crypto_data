import mongoose from "mongoose";

const dbConnect = async() => {
    try{
        const cnn = await mongoose.connect(process.env.DB_URL)
        console.log(`DB connect at ${cnn.connection.host}`)
    }catch(err){
        console.log(err.message)
        process.exit(1)
    }
}

export default dbConnect