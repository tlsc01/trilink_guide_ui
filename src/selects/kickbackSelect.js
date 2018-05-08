import React from 'react';

const buildKickbacks = (incomingKickbacks, selectedKickback, handleKickbackChange) => {
  let options = incomingKickbacks.map((kickback, index) => {
    const key_index = kickback.kickback.split(" ").join("_").toLowerCase();
    const key=key_index + "_" + index;
    return <option key={key} value={kickback.kickback}>{kickback.kickback}</option>
  });

  options.unshift(<option key='none_selected' value="">Select a Kickback</option>)

  return (
    <div className="custom-select">
      <select
        id="kickback"
        onChange={handleKickbackChange}
        value={selectedKickback}
        style={{width: '100%'}}>
        {options}
      </select>
    </div>
  );
}

const KickbackSelect = (props) => {
  return (
    <div>
      {buildKickbacks(props.kickbacks, props.selectedKickback, props.handleKickbackChange)}
    </div>
  )
};

export default KickbackSelect;
