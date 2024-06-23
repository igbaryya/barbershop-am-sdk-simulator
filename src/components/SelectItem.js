import React from 'react';
import Select from 'react-select';

export default function SelectItem({changeHandler, list, placeholder}) {
  const options = list.map((item) => {
    return {
      value: item,
      label: item
    }
  });  
  return (
      <div>
        <Select 
          defaultValue={options[0]}
          options={options} 
          placeholder={placeholder} 
          onChange={(e) => { changeHandler(e.value); }}
        />
      </div>
    );
};