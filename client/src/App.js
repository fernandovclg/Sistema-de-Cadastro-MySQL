import './App.css';
import Cadastro from './components/Cadastro';
import Header from './components/Header';
import Login from './components/Login';


function App() {
  return (
    <div className="App">
      <Header/>
      <div className='bodyContainer'>
        <Login/>
        <Cadastro/>
      </div>
    </div>
  );
}

export default App;
