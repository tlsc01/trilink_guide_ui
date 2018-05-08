import React from 'react';

const buildModels = (incomingModels, selectedModel, handleModelChange) => {
  let options = incomingModels.map((model, index) => {
    const key_index = model.model.split(" ").join("_").toLowerCase();
    const key=key_index + "_" + index;
    return <option key={key} value={model.model}>{model.model}</option>
  });

  options.unshift(<option key='none_selected' value="">Select a Model</option>)

  return (
    <select
      id="model"
      onChange={handleModelChange}
      value={selectedModel}>
      {options}
    </select>
  );
}

const ModelSelect = (props) => {
  return (
    <div>
      {buildModels(props.models, props.selectedModel, props.handleModelChange)}
    </div>
  )
};

export default ModelSelect;
