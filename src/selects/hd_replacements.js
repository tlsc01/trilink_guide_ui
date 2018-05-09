import React from 'react';
import TableRow from './hd_tableRow';
import './hd_replacements.css';
import ShowCompatibleChains from './hd_showCompatibleChains';

const buildReplacements = (replacements) => {
  if (replacements.length === 0) {
    return (
      <tr>
        <td colSpan='7'>No Results</td>
      </tr>
    )
  } else {
    let tableRows = replacements.map((replacement) => {
      return <TableRow key={replacement.id} replacement={replacement} />
    });

    return tableRows;
  }
};

const Replacements = (props) => {
  return (
    <div>
      <table className="hd_replacements" width="100%" border="0" cellSpacing="0" cellPadding="0">
        <thead>
          <tr>
            <th>CHAIN</th>
            <th>SKU</th>
            <th>DESCRIPTION</th>
            <th>PITCH</th>
            <th>GAUGE</th>
            <th>FILE SIZE</th>
          </tr>
        </thead>
        <tbody>
          {buildReplacements(props.replacements)}
        </tbody>
      </table>
      <br/>
      <br/>
      {ShowCompatibleChains(props.url)}
    </div>
  )
};

export default Replacements;
