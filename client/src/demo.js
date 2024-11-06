import fetch from 'node-fetch';

const API_URL = 'https://api.example.com/v1/ticker/btcinr'; // Replace with the actual API URL

// Format number with commas for INR
function formatNumber(num) {
  return new Intl.NumberFormat('en-IN').format(num);
}

// Calculate percentage change between two values
function calculatePercentageChange(current, previous) {
  return ((current - previous) / previous) * 100;
}

async function processCryptoData() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    const btcData = data.btcinr;

    // Parse current and open prices
    const currentPrice = parseFloat(btcData.last);
    const openPrice = parseFloat(btcData.open);

    // Calculate best price to trade (average of high and low)
    const bestPrice = (parseFloat(btcData.high) + parseFloat(btcData.low)) / 2;

    // Simulated data for various platforms
    const platforms = [
      { name: 'WazirX', price: currentPrice * 0.9985 },
      { name: 'Bitbns', price: currentPrice * 1.0020 },
      { name: 'Colodax', price: currentPrice * 0.9990 },
      { name: 'Zebpay', price: currentPrice * 1.0010 }
    ];

    // Calculate difference, savings, and buy/sell prices for each platform
    const processedPlatforms = platforms.map(platform => {
      const difference = calculatePercentageChange(platform.price, bestPrice);
      const savings = Math.abs(platform.price - bestPrice);
      return {
        name: platform.name,
        lastPrice: formatNumber(Math.round(platform.price)),
        buyPrice: formatNumber(Math.round(platform.price * 0.9995)),
        sellPrice: formatNumber(Math.round(platform.price * 1.0005)),
        difference: difference.toFixed(2),
        savings: formatNumber(Math.round(savings))
      };
    });

    // Sort platforms by absolute difference
    processedPlatforms.sort((a, b) => Math.abs(parseFloat(b.difference)) - Math.abs(parseFloat(a.difference)));

    // Construct output object with best price, time stats, and platform data
    const result = {
      bestPrice: formatNumber(Math.round(bestPrice)),
      timeStats: [
        { period: '5 Mins', change: calculatePercentageChange(currentPrice, currentPrice * 0.9995).toFixed(2) },
        { period: '1 Hour', change: calculatePercentageChange(currentPrice, currentPrice * 0.999).toFixed(2) },
        { period: '1 Day', change: calculatePercentageChange(currentPrice, openPrice).toFixed(2) },
        { period: '7 Days', change: calculatePercentageChange(currentPrice, currentPrice * 0.98).toFixed(2) }
      ],
      platforms: processedPlatforms
    };

    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Error processing crypto data:', error);
  }
}

// Run the function
processCryptoData();