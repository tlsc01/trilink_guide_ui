import React from 'react';

const buildBrands = (incomingBrands, selectedBrand, handleBrandChange) => {
  let options = incomingBrands.map((brand, index) => {

    let key=brand + "_" + index;
    return <option key={key} value={brand}>{brand}</option>
  });

  options.unshift(<option key='none_selected' value="">Select a Brand</option>)

  return (
    <select
      id="brands"
      onChange={handleBrandChange}
      value={selectedBrand}>
      {options}
    </select>
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
