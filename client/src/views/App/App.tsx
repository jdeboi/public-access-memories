import React from "react";
import "./App.css";
import Header from '../../components/Header/Header';

function App() {
  
  return (
    <div className="App">
      <Header />
    </div>
  );
}


// function App() {
//   const [data, setData] = React.useState(null);

//   React.useEffect(() => {
//     fetch("/api")
//       .then((res) => res.json())
//       .then((data) => setData(data.message));
//   }, []);

//   return (
//     <div className="App">
//       <header className="App-header">
//         <p>{!data ? "Loading..." : data}</p>
//       </header>
//     </div>
//   );
// }

export default App;
