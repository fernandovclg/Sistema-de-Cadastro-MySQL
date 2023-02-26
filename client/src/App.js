import { useState } from 'react';
import './App.css';


import Homepage from './screens/Homepage';
import Login from './screens/Login';
import Register from './screens/Register';


function App() {
  const [tela,setTela] = useState("homepage")
  const [user,setUser] = useState(null)

  const telas ={
    'homepage': <Homepage setTela={setTela} user={user} setUser={setUser}/>,
    'login': <Login setTela={setTela} user={user} setUser={setUser}/>,
    'register': <Register setTela={setTela} user={user} setUser={setUser}/>,
  }
  return (
    <div className="App">
      {telas[tela]}
    </div>
  );
}

export default App;
