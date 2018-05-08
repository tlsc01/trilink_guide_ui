import React from 'react';
import './brand.css';

const buildBrands = (incomingBrands, selectedBrand, handleBrandChange) => {
  let options = incomingBrands.map((brand, index) => {

    let key=brand + "_" + index;
    return <option key={key} value={brand}>{brand}</option>
  });

  options.unshift(<option key='none_selected' value="">Select a Brand</option>)

  return (
    <div className="custom-select">
      <select
        onChange={handleBrandChange}
        value={selectedBrand}>
        {options}
      </select>
    </div>
  );
}

const BrandSelect = (props) => {
  return (
    <div>
      {buildBrands(props.brands, props.selectedBrand, props.handleBrandChange)}
    </div>
  )
};

export default BrandSelect;
