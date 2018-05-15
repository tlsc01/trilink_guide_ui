import React from 'react';

const buildGauges = (incomingGauges, selectedGauge, handleGaugeChange) => {
  let options = incomingGauges.map((gauge, index) => {
    console.log(">>>>>>> gauge: ", gauge);
    const key_index = gauge.gauge.split(" ").join("_").toLowerCase();
    const key=key_index + "_" + index;
    return <option key={key} value={gauge.gauge}>{gauge.gauge}</option>
  });

  options.unshift(<option key='none_selected' value="">+ GAUGE</option>)

  return (
    <div className="custom-select">
      <select
        onChange={handleGaugeChange}
        value={selectedGauge}
        style={{width: '100%'}}>
        {options}
      </select>
    </div>
  );
}

const GaugeSelect = (props) => {
  return (
    <div>
      {buildGauges(props.gauges, props.selectedGauge, props.handleGaugeChange)}
    </div>
  )
};

export default GaugeSelect;
