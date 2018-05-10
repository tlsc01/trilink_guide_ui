import React from 'react';

const buildButton = (url) => {
  if (url) {
    return (
      <div>
        <a href={url} target="_blank"><img width='100%' src='compatibleChains.png' alt="Show Compatible Chains"/></a>
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }
}

const ShowMobileCompatibleChains = (url) => {
  return (
    buildButton(url)
  )
}

export default ShowMobileCompatibleChains;