import React from 'react';
import TableRow from './tableRow';

const buildReplacements = (replacements) => {
  if (replacements.length === 0) {
    return (
      <tr>
        <td>No Results</td>
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
      <h3>REPLACEMENT CHAIN / FIT-UP RESULTS</h3>
      <table style={{width: '100%'}}>
        <thead>
          <tr>
            <th>CHAIN*</th>
            <th>TRILINK PN</th>
            <th>DESCRIPTION</th>
            <th>PITCH</th>
            <th>GAUGE</th>
            <th>FILE SIZE</th>
            <th>SAFETY</th>
          </tr>
        </thead>
        <tbody>
          {buildReplacements(props.replacements)}
        </tbody>
      </table>
    </div>
  )
};

export default Replacements;
