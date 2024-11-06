import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const DropDown = ({ options, selected, setSelected,isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleDropdown}
        className={`flex items-center px-4 py-2 rounded-md ${
          isDarkMode ? 'bg-[#2e3241] text-gray-200' : 'bg-gray-200 text-gray-700'
        }`}
      >
        {selected} <ChevronDown className="ml-2 h-4 w-4" />
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white rounded-md shadow-lg">
          {options.map((option) => (
            <button
              key={option}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => handleSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;