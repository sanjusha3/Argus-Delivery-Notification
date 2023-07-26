
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
// import Auth from "./Auth"
import Signup from "./components/Signup/signUp"
import Login from "./components/Login/login"
import NavBar from "./components/utils/NavBar"
import Packages from "./components/Employee/empPackages"
import EmployeeDetails from "./components/Admin/employeeDetails"
import EmployeePackages from "./components/Admin/employeePackages"

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/employee/packages" element={<Packages />} />
        <Route exact path="/admin/employeeDetails" element={<EmployeeDetails />} />
        <Route exact path="/admin/packageDetails" element={<EmployeePackages />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App