import React from 'react';

const buildButton = (url) => {
  console.log('>>>>>> Do we have a url? ', url);
  if (url) {
    return (
      <div>
        <table width="100%">
          <tbody>
            <tr>
              <td colSpan="6" style={{textAlign: 'right'}}>
                <a href={url} target="_blank"><img width='30%' src='compatibleChains.png' alt="Show Compatible Chains"/></a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }
}

const ShowCompatibleChains = (url) => {
  return (
    buildButton(url)
  )
}

export default ShowCompatibleChains;