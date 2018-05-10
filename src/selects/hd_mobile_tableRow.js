import React from 'react';

const TableRow = (replacement) => {
  const chain_filename = `${replacement.replacement.img_lookup}.png`
  return (
    <tr>
      <td className="start"><img id="chain" src={chain_filename.toLowerCase()} width="25%" alt="chain"/></td>
      <td>{replacement.replacement.sku}</td>
    </tr>
  )
};

export default TableRow;
