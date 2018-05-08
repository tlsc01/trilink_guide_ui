import React from 'react';

const buildPitches = (incomingPitches, selectedPitch, handlePitchChange) => {
  let options = incomingPitches.map((pitch, index) => {
    const key_index = pitch.pitch.split(" ").join("_").toLowerCase();
    const key=key_index + "_" + index;
    return <option key={key} value={pitch.pitch}>{pitch.pitch}</option>
  });

  options.unshift(<option key='none_selected' value="">Select a Pitch</option>)

  return (
    <select
      id="pitch"
      onChange={handlePitchChange}
      value={selectedPitch}>
      {options}
    </select>
  );
}

const PitchSelect = (props) => {
  return (
    <div>
      {buildPitches(props.pitches, props.selectedPitch, props.handlePitchChange)}
    </div>
  )
};

export default PitchSelect;
