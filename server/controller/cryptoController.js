import axios from "axios"
import cryptoSchema from "../model/cryptoSchema.js"

const url = "https://api.wazirx.com/api/v2/tickers"
export const fetchAndStoreData = async(req,res) => {
    try{
        const response = await axios.get(url)
        //console.log("res is =>"  , Object.values(response).slice(0,10)) 
        //const data = await res
        const data = response.data
        const top10Data = Object.values(data).slice(0,10).map((i) => ({
            name: i.name,
            last: i.last,
            buy: i.buy,
            Sell: i.sell,
            volume: i.volume,
            base_unit: i.base_unit,
            high: i.high,
            low: i.low
        }))

        await cryptoSchema.deleteMany({})

        await cryptoSchema.insertMany(top10Data)

        res.status(200).json({ message: 'Data fetched and stored successfully.' });
    }catch(err){
        console.error('Error fetching or storing data:', err);
        res.status(500).json({ error: 'Failed to fetch and store data.' });
    }
}

export const getAllData = async(req,res) => {
    try{
        const data = await cryptoSchema.find({})
        console.log("get data => " , data)
        res.status(200).json({
            data
        })
    }catch(err){
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Failed to fetch data.' });
    }
}