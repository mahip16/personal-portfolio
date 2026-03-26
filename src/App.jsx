import { useState } from "react"
import "./App.css"
import { NavBar } from "./components/Navbar.jsx"
import 'bootstrap/dist/css/bootstrap.min.css';
import Hero from "./components/Hero.jsx"
import { About } from "./components/About.jsx"
import { Skills } from "./components/Skills.jsx"
import { Projects } from "./components/Projects.jsx"
import { ContactModal } from "./components/Contactmodal.jsx"


function App() {
  const [contactOpen, setContactOpen] = useState(false)

  return (
    <div className="App">
      <NavBar onConnect={() => setContactOpen(true)} /> 
      <Hero />  
      <About /> 
      <Skills />   
      <Projects />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  )
}

export default App
