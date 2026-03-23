import "./App.css"
import { NavBar } from "./components/Navbar.jsx"
import 'bootstrap/dist/css/bootstrap.min.css';
import Hero from "./components/Hero.jsx"
import { Skills } from "./components/Skills.jsx"

function App() {
  return (
    <div className="App">
      <NavBar />  
      <Hero />   
      <Skills />   
    </div>
  )
}

export default App
