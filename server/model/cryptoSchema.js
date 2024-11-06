import mongoose from "mongoose";

const cryptoSchema = new  mongoose.Schema({
    name: {
        type: String,
    },
    last: {
        type: Number,
    },
    buy: {
        type: Number,
    },
    Sell: {
        type: Number,
    },
    volume: {
        type: Number,
    },
    base_unit: {
        type: String,
    },
    high: {
        type: String,
    },
    low: {
        type: String,
    }
})

export default  mongoose.model("Crypto", cryptoSchema);