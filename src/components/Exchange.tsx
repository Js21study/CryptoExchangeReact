import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import ToggleSwitch from './ToggleSwitch';

const title = 'ETH/USDT Exchange App';

interface ETHUSDTPriceData {
  symbol: string;
  price: string;
  timestamp: string;
}

const Exchange: React.FC = () => {
  const [ethAmount, setEthtAmount] = useState<number | string>('');
  const [toggle, setToggle] = useState<'Buy' | 'Sell'>('Buy');
  const [usdtPrice, setUsdtPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const data = await axios.get(
          'https://www.binance.com/bapi/margin/v1/public/margin/all-price-index',
        );
        const ETHUSDTPrice = data.data.data.filter(
          (el: ETHUSDTPriceData) => el.symbol === 'ETHUSDT',
        );
        setUsdtPrice(parseFloat(ETHUSDTPrice[0].price));
      } catch (error) {
        console.error('Error fetching price:', error);
      }
    };
    fetchPrice();
  }, []);

  const handleEthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(event.target.value) > 0) {
      setEthtAmount(parseFloat(event.target.value));
    } else {
      setEthtAmount('');
    }
  };

  const calculateUsdtAmount = () => {
    if (usdtPrice !== null) {
      return toggle === 'Buy' ? Number(ethAmount) * usdtPrice : Number(ethAmount) / usdtPrice;
    }
    return null;
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="p-10 bg-white rounded shadow-lg">
        <h1 className="text-2xl font-semibold mb-4">
          {title.split('').map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 1 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 5, repeat: Infinity, delay: index * 0.1 }}
            >
              {letter}
            </motion.span>
          ))}
        </h1>
        <input
          placeholder="Enter ETH amount"
          value={ethAmount}
          onChange={handleEthChange}
          className="w-full p-2 border rounded mb-2"
        />

        <div className="my-5">
          <ToggleSwitch toggle={toggle} setToggle={setToggle} />
        </div>

        {usdtPrice !== null && (
          <p className="text-lg">
            <span
              className={`${toggle === 'Sell' ? 'text-red-700' : 'text-green-700'} font-semibold`}
            >
              {toggle}
            </span>{' '}
            {ethAmount} ETH = <span className="font-semibold">{calculateUsdtAmount()} USDT</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Exchange;
