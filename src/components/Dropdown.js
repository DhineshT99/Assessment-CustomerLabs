// src/components/Dropdown.js
import React, { useState } from 'react';

const Dropdown = ({ options, onAddSchema }) => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const handleAdd = () => {
    if (selectedValue) {
      onAddSchema(selectedValue);
      setSelectedValue('');
    }
  };

  return (
    <div>
      <select value={selectedValue} onChange={handleChange}>
        <option value="">Select schema</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      <button onClick={handleAdd}>+ Add New Schema</button>
    </div>
  );
};

export default Dropdown;
