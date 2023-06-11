import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Alunos from './components/Alunos'
import Sobre from './components/Sobre'

function App() {
  return (
    <div>
      <h1>Crud</h1>
      <BrowserRouter>
        <ul>
          <li><Link to='/'>Página Inicial</Link></li>
          <li><Link to='/alunos'>Cadastro de Alunos</Link></li>
          <li><Link to='/sobre'>Sobre</Link></li>
        </ul>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/alunos' element={<Alunos />} />
          <Route path='/sobre' element={<Sobre />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
