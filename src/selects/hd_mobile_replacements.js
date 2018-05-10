import React from 'react';
import TableRow from './hd_mobile_tableRow';
import './hd_replacements.css';
import ShowCompatibleChains from './hd_mobile_showCompatibleChains';

const buildReplacements = (replacements) => {
  if (replacements.length > 0) {
    let tableRows = replacements.map((replacement) => {
      return <TableRow key={replacement.id} replacement={replacement} />
    });

    return tableRows;
  }
};

const MobileReplacements = (props) => {
  return (
    <div>
      <table className="hd_mobile_replacements" width="100%" border="0" cellSpacing="0" cellPadding="0">
        <thead>
          <tr>
            <th>CHAIN</th>
            <th>THD SKU</th>
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

export default MobileReplacements;
