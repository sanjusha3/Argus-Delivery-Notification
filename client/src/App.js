
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
// import Auth from "./Auth"
import Signup from "./components/Signup/signUp"
import Login from "./components/Login/login"
import NavBar from "./components/utils/NavBar"
import EmployeePackages from "./components/Employee/empPackages"

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/employee/packageDetails" element={<EmployeePackages />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App