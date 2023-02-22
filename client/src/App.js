import './App.css';
import Cadastro from './components/Cadastro';
import Header from './components/Header';


function App() {
  return (
    <div className="App">
      <Header/>
      <div className='bodyContainer'>
        <Cadastro/>
      </div>
    </div>
  );
}

export default App;
