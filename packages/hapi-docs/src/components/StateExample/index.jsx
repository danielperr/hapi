import React from 'react';

function StateExample() {
  const [count, setCount] = React.useState(0);

  return (
    <>
      <p>
        You have clicked {count} times.
      </p>
      <button onClick={() => { setCount(count + 1) }}>
        Click
      </button>
    </>
  );
}

export default StateExample;
