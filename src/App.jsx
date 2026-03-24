import "./App.css"
import { NavBar } from "./components/Navbar.jsx"
import 'bootstrap/dist/css/bootstrap.min.css';
import Hero from "./components/Hero.jsx"
import { About } from "./components/About.jsx"
import { Skills } from "./components/Skills.jsx"
import { Projects } from "./components/Projects.jsx"


function App() {
  return (
    <div className="App">
      <NavBar />  
      <Hero />  
      <About /> 
      <Skills />   
      <Projects />
    </div>
  )
}

export default App
