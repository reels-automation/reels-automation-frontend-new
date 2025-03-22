import React, { useState, useEffect } from "react";

function App() {

  const [data, setData] = useState([{}]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}`).then(
      res => res.json()
    ).then(
      data => {
        setData(data)
      }
    )
  }, []);

  console.log(data)

  return (
    <div>
      <p>{data.message}</p>
    </div>
  );
}

export default App;
