import "./App.css"
import { NavBar } from "./components/Navbar.jsx"
import 'bootstrap/dist/css/bootstrap.min.css';
import Hero from "./components/Hero.jsx"

function App() {
  return (
    <div className="App">
      <NavBar />  
      <Hero />      
    </div>
  )
}

export default App
