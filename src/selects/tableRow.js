import React from 'react';

const TableRow = (replacement) => {
    console.log("building table row : ", replacement);
  return (
    <tr>
        <td>{replacement.replacement.chain}</td>
        <td>{replacement.replacement.trilinkpn}</td>
        <td>{replacement.replacement.description}</td>
        <td>{replacement.replacement.pitch}</td>
        <td>{replacement.replacement.gauge}</td>
        <td>{replacement.replacement.filesize}</td>
        <td>{replacement.replacement.kickback}</td>
    </tr>
  )
};

export default TableRow;
