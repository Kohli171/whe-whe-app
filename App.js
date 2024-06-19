import React, { useState } from 'react';
import NumberButton from './Components/NumberButton';
import MoneyButton from './Components/MoneyButton';
import ControlPanel from './Components/ControlPanel';
import DisplayPanel from './Components/DisplayPanel';
import './App.css';

const App = () => {
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [totalMoney, setTotalMoney] = useState(0);
  const [finalizedNumbers, setFinalizedNumbers] = useState([]);
  const [finalizedMoney, setFinalizedMoney] = useState(0);

  const toggleSelection = (number) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter(n => n !== number));
    } else {
      if (selectedNumbers.length < 5) {
        setSelectedNumbers([...selectedNumbers, number]);
      } else {
        alert('You can only select 5 numbers!');
      }
    }
  };

  const addMoney = (value) => {
    if (selectedNumbers.length === 5) {
      setTotalMoney(totalMoney + value);
    } else {
      alert('Please select 5 numbers before assigning money!');
    }
  };

  const clearSelections = () => {
    setSelectedNumbers([]);
    setTotalMoney(0);
  };

  const finalizeTicket = () => {
    if (selectedNumbers.length === 5 && totalMoney > 0) {
      setFinalizedNumbers(selectedNumbers);
      setFinalizedMoney(totalMoney);
      alert('Ticket finalized!');
    } else {
      alert('Please complete the selections and add money before finalizing.');
    }
  };

    const randomizeSelections = () => {
      let randomNumbers = new Set();
      console.log("Selected numbers: ", selectedNumbers);
      while (randomNumbers.size < 5) {
        randomNumbers.add(Math.floor(Math.random() * 20) + 1);
      }
      setSelectedNumbers([...randomNumbers]);  // Update state once with all new numbers
      console.log("after: ", selectedNumbers);

    };  

  return (
    <div className="app">
      <div className="number-panel">
        {Array.from({ length: 20 }, (_, i) => (
          <NumberButton
            key={i + 1}
            number={i + 1}
            isSelected={selectedNumbers.includes(i + 1)}
            toggleSelection={toggleSelection}
          />
        ))}
      </div>
      <div className="money-panel">
        {[1, 5, 10, 20].map(value => (
          <MoneyButton key={value} value={value} addMoney={addMoney} />
        ))}
      </div>
      <ControlPanel 
        clearSelections={clearSelections} 
        finalizeTicket={finalizeTicket}
        randomizeSelections={randomizeSelections}
      />
      {selectedNumbers.length > 0 && totalMoney > 0 && (
        <DisplayPanel selectedNumbers={selectedNumbers} totalMoney={totalMoney} />
      )}
    </div>
  );
};

export default App;
