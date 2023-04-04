import { useState} from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css'
import Home from './pages/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1>Bienvenidos a la pagina principal</h1>
      <h2>Rutas</h2>
      <Router>
          <Route exact path="/home" component={<Home/>} />
      </Router>
      
    </div>
  )
}

export default App
