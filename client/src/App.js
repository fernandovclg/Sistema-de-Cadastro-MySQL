import { useState } from 'react';
import './App.css';


import Homepage from './screens/Homepage';
import Login from './screens/Login';
import Register from './screens/Register';


function App() {
  const [tela,setTela] = useState("homepage")
  const telas ={
    'homepage': <Homepage setTela={setTela}/>,
    'login': <Login setTela={setTela}/>,
    'register': <Register setTela={setTela}/>,
  }
  return (
    <div className="App">
      {telas[tela]}
    </div>
  );
}

export default App;
