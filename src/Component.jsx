import React from 'react'
import ReactJson from 'react-json-view';

const Component = ({countryData}) => {
  return (
    <div>
      <ReactJson src={countryData} theme="monokai" collapsed={1} />
    </div>
  );
}

export default Component