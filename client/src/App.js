
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
// import Auth from "./Auth"
import SignupLogin from "./components/Login/login"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignupLogin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App