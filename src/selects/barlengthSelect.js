import React from 'react';

const buildBarlengths = (incomingBarlengths, selectedBarlength, handleBarlengthChange) => {
  let options = incomingBarlengths.map((barlength, index) => {
    const key_index = barlength.barlength.split(" ").join("_").toLowerCase();
    const key=key_index + "_" + index;
    return <option key={key} value={barlength.barlength}>{barlength.barlength}</option>
  });

  options.unshift(<option key='none_selected' value="">Select a Barlength</option>)

  return (
    <div className="custom-select">
      <select
        id="model"
        onChange={handleBarlengthChange}
        value={selectedBarlength}
        style={{width: '100%'}}>
        {options}
      </select>
    </div>
  );
}

const BarlengthSelect = (props) => {
  return (
    <div>
      {buildBarlengths(props.barlengths, props.selectedBarlength, props.handleBarlengthChange)}
    </div>
  )
};

export default BarlengthSelect;
