
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { connect } from 'react-redux';
// import Auth from "./Auth"
import Signup from "./components/Signup/signUp"
import Login from "./components/Login/login"
import NavBar from "./components/utils/NavBar"
import Packages from "./components/Employee/empPackages"
import EmployeeDetails from "./components/Admin/employeeDetails"
import EmployeePackages from "./components/Admin/employeePackages"


function App(props) {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
      </Routes>
      {props.token && props.role === "employee" ? <Routes><Route exact path="/employee/packages" element={<Packages />} /></Routes>
        :
        props.token && props.role === "admin" ?
          <Routes>
            <Route exact path="/admin/employeeDetails" element={<EmployeeDetails />} />
            <Route exact path="/admin/packageDetails" element={<EmployeePackages />} />
          </Routes>
          : (
            <h1 style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>You are not authorized to access this page.</h1>
          )
      }
    </BrowserRouter>
  )
}

const mapStateToProps = state => ({
  role: state.role,
  token: state.token,
});

export default connect(mapStateToProps)(App)