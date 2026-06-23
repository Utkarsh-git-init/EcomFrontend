import './App.css'
import {Route, Routes} from "react-router-dom";
import HomePage from "./homepage/HomePage.jsx";
import Register from "./login/Register.jsx";

function App() {

    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/register" element={<Register/>}/>
        </Routes>
    )
}

export default App
