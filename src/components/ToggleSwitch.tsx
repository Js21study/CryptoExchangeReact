import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ToggleSwitchProps {
  toggle: string;
  setToggle: React.Dispatch<React.SetStateAction<'Buy' | 'Sell'>>;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ toggle, setToggle }) => {
  const [move, setMove] = useState(toggle);

  const handleToggle = () => {
    if (toggle === 'Buy') {
      setMove('Sell');
      setToggle('Sell');
    } else {
      setMove('Buy');
      setToggle('Buy');
    }
  };

  return (
    <div className="flex items-center">
      <span className="mr-2">Buy</span>
      <motion.div
        className={`relative w-12 h-6 rounded-full cursor-pointer  ${
          move === 'Buy' ? 'bg-green-200' : 'bg-red-200'
        }`}
        onClick={handleToggle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className={`absolute w-6 h-6 rounded-full  shadow-md ${
            move === 'Sell' ? 'right-0 bg-red-500' : 'left-0 bg-green-500'
          }`}
        />
      </motion.div>
      <span className="ml-2">Sell</span>
    </div>
  );
};

export default ToggleSwitch;
