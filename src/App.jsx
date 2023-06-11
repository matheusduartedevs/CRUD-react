import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Alunos from './components/Alunos'
import Sobre from './components/Sobre'
import { Nav } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <h1>Crud</h1>
      <BrowserRouter>
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link href="/">Página Inicial</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/alunos">Alunos</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/sobre">Sobre</Nav.Link>
          </Nav.Item>
        </Nav>

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
