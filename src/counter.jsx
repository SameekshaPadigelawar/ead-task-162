import React, { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Set up the interval to increment count every 1 second
    const timer = setInterval(() => {
      setCount(prevCount => prevCount + 1);
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <h1>Count: {count}</h1>
    </div>
  );
}

export default Counter;
// DGg2VWTMR3Nb82Jh-pwd
// saipadgilwar25_db_user
// mongodb+srv://saipadgilwar25_db_user:DGg2VWTMR3Nb82Jh@cluster0.2tbbvyg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0_connneection string