import React from 'react';

const TableRow = (replacement) => {
  const chain_filename = `${replacement.replacement.img_lookup}.png`
  return (
    <tr>
        <td className="start"><img src={chain_filename.toLowerCase()} width="50%" alt="chain"/></td>
        <td>{replacement.replacement.sku}</td>
        <td>{replacement.replacement.description}</td>
        <td>{replacement.replacement.pitch}</td>
        <td>{replacement.replacement.gauge}</td>
        <td className="end">{replacement.replacement.filesize}</td>
    </tr>
  )
};

export default TableRow;
