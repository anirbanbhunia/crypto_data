import { useEffect, useState } from 'react'
import { Send,Menu } from 'lucide-react'
import DropdownButton from './DropDown'
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import SwitchExample from './SwitchButton';
import axiosInstance from './Helpers/axiosInstance';

export default function Component() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currency, setCurrency] = useState(['INR'])
  const [crypto, setCrypto] = useState('BTC')
  const [allCryptos, setAllCryptos] = useState([])
  const [platformData,setPlatformData] = useState([])
  const [timeStats, setTimeStats] = useState([
    { period: '5 Mins', change: 0.1 },
    { period: '1 Hour', change: 0.96 },
    { period: '1 Day', change: 2.73 },
    { period: '7 Days', change: 7.51 },
  ]);

  const [timer, setTimer] = useState(60);

// Format number with commas for INR
    function formatNumber(num) {
        return new Intl.NumberFormat('en-IN').format(num);
    }
// Calculate percentage change between two values
    function calculatePercentageChange(current, previous) {
        return ((current - previous) / previous) * 100;
    }

  async function fetchData() {
        try{
            const res = await axiosInstance.get("/getdata")
            //console.log(res.data.data)
            //setPlatformData(res.data.data)
            const arr =  res.data.data.map((item) => item.base_unit.toUpperCase())
            //console.log(arr)
            setAllCryptos(arr)

            //making array for for allcurrency individual data
            const arr2 = res.data.data.map((i) => {
                const bestPrice = (parseFloat(i.high) + parseFloat(i.low)) / 2;
                const difference = calculatePercentageChange(i.buy, bestPrice);
                const savings = Math.abs(i.buy - bestPrice);
                return {
                    name: i.name,
                    last: formatNumber(Math.round(i.last)),
                    buy: formatNumber(Math.round(i.buy * 0.9995)),
                    Sell: formatNumber(Math.round(i.Sell * 1.0005)),
                    difference: difference.toFixed(2),
                    savings: formatNumber(Math.round(savings)),
                    bestPrice: bestPrice,
                    high: i.high,
                    low: i.low,
                }
            })
            // console.log(arr2)
            // console.log(crypto)

            const platformName = ['WazirX','Bitbns','Colodax','Zebpay']

            const combinedData = platformName.map((name, index) => ({
                id: index + 1,
                platformName: platformName[index],
                name: name,
                ...arr2[index]
              }))
        console.log(combinedData)
              setPlatformData(combinedData)
            // console.log("arr3",arr3);
            // console.log("plat",platformData);
            
        }catch(err){
            console.log(err.message)
        }
  }
  
  useEffect(() => {
    console.log("platformData after update:", platformData);
  }, [platformData]);

  useEffect(() => {
    fetchData()
  },[crypto])

  useEffect(() => {
    setTimeout(() => {
      if (timer === 0) setTimer(60);
      else setTimer(timer - 1);
    }, 1000);
    return () => {};
  }, [timer]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#191d28] text-gray-200' : 'bg-gray-100 text-gray-800'}`}>
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <h1 className={`text-2xl md:text-4xl font-bold ${isDarkMode ? 'text-[#00b4c9]' : 'text-[#00a0b4]'}`}>HODLINFO</h1>
          <div className="hidden md:flex items-center gap-4">
            <DropdownButton options={currency} selected={currency} setSelected={setCurrency} isDarkMode={isDarkMode} />
            <DropdownButton options={allCryptos} selected={crypto} setSelected={setCrypto} isDarkMode={isDarkMode} />
            <button className={`${isDarkMode ? 'bg-[#2e3241]' : 'bg-gray-200'} px-4 py-2 rounded-md`}>
              BUY {crypto}
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div style={{ width: "6vh" }}>
            <CircularProgressbar
                value={timer}
                maxValue={60}
                text={`${timer}%`}
            ></CircularProgressbar>
            </div>
            <button
              className={`hidden md:flex ${isDarkMode ? 'bg-[#00b4c9] hover:bg-[#00a0b4]' : 'bg-[#00a0b4] hover:bg-[#008c9e]'} text-white px-4 py-2 rounded-md flex items-center`}
            >
              <Send className="mr-2 h-4 w-4" />
              Connect Telegram
            </button>
            <button
              onClick={toggleDarkMode}
              className={`rounded-full p-2 ${isDarkMode ? 'text-yellow-400 hover:text-yellow-500' : 'text-gray-600 hover:text-gray-800'}`}
            >
              {isDarkMode ? <SwitchExample/> : <SwitchExample/> }
              <span className="sr-only">{isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}</span>
            </button>
            <button onClick={toggleMenu} className="md:hidden p-2">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="mt-4 md:hidden">
            <DropdownButton options={currency} selected={currency} setSelected={setCurrency} isDarkMode={isDarkMode} />
            <DropdownButton options={allCryptos} selected={crypto} setSelected={setCrypto} isDarkMode={isDarkMode} />
            <button className={`${isDarkMode ? 'bg-[#2e3241]' : 'bg-gray-200'} px-4 py-2 rounded-md`}>
              BUY {crypto}
            </button>
          </div>
        )}
      </header>


      {/* Stats */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center mb-8">
          {timeStats.map((stat, index) => (
            <div key={index}>
              <div className={`text-lg md:text-2xl ${stat.change > 0 ? (isDarkMode ? 'text-[#00b4c9]' : 'text-[#00a0b4]') : 'text-red-500'}`}>
                {stat.change}%
              </div>
              <div className={`text-sm md:text-base ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>{stat.period}</div>
            </div>
          ))}
        </div>

        {/* Best Price */}
        <div className="text-center mb-12">
          <div className={`text-lg md:text-xl mb-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>Best Price to Trade</div>
          <div className="text-4xl md:text-6xl font-bold mb-4">₹ {platformData[0]&&platformData[0].bestPrice || "26,56,110"}</div>
          <div className={`text-sm md:text-base ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
            Average BTC/INR net price including commission
          </div>
        </div>

        {/* Platform Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={isDarkMode ? 'text-gray-500' : 'text-gray-600'}>
                <th className="py-4 text-left">#</th>
                <th className="py-4 text-left">Platform</th>
                <th className="py-4 text-right">Last Traded Price</th>
                <th className="py-4 text-right">Buy / Sell Price</th>
                <th className="py-4 text-right">Difference</th>
                <th className="py-4 text-right">Savings</th>
              </tr>
            </thead>
            <tbody>
              {platformData.length>0 && platformData.map((platform,index) => (
                <tr
                  key={`${index}`}
                  className={`${isDarkMode ? 'bg-[#2e3241] bg-opacity-40' : 'bg-white'} border-b-4 ${isDarkMode ? 'border-[#191d28]' : 'border-gray-100'}`}
                >
                  <td className="py-4 px-2 md:px-4">{index+1}</td>
                  <td className="py-4 px-2 md:px-4 font-semibold">{platform.platformName}</td>
                  <td className="py-4 px-2 md:px-4 text-right">₹ {platform.last}</td>
                  <td className="py-4 px-2 md:px-4 text-right">
                    ₹ {platform.buy} / ₹ {platform.Sell}
                  </td>
                  <td className={`py-4 px-2 md:px-4 text-right ${platform.difference > 0 ? (isDarkMode ? 'text-[#00b4c9]' : 'text-[#00a0b4]') : 'text-red-500'}`}>
                    {platform.difference}%
                  </td>
                  <td className={`py-4 px-2 md:px-4 text-right ${platform.difference > 0 ? (isDarkMode ? 'text-[#00b4c9]' : 'text-[#00a0b4]') : 'text-red-500'}`}>
                    {platform.difference > 0 ? '▲' : '▼'} ₹ {platform.savings}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add to Home Screen */}
        <div className="text-center mt-8">
        <button className={`border ${!isDarkMode ? 'border-[#2e3241]' : 'border-gray-200'} px-4 py-2 rounded-md`}>
              Add hodlinfo to home screen
            </button>
        </div>
      </div>
    </div>
  )
}