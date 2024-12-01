import Home from './Screens/Home/Home';
import {Route,Routes} from "react-router-dom";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css';
import Task from "./Screens/Home/Task/Task";
import Property from './Screens/Home/Property/Property';
function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/Property" element={<Property/>}/>
      <Route path="/Task" element={<Task/>}/>

    </Routes>
  
    </>
  )
}

export default App
