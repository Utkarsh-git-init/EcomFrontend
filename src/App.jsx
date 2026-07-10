import './App.css'
import {Route, Routes} from "react-router-dom";
import HomePage from "./homepage/HomePage.jsx";
import Register from "./login/Register.jsx";
import MainLayout from "./layout/MainLayout.jsx";
import Login from "./login/Login.jsx";
import AdminPage from "./admin/AdminPage.jsx";
import AddProduct from "./admin/AddProduct.jsx";
import ProductList from "./ProductList/ProductList.jsx";
import ProductPage from "./productPage/ProductPage.jsx";
import CartPage from "./cart/CartPage.jsx";
import Menu from "./menu/Menu.jsx";

function App() {

    return (
        <Routes>
            <Route element={<MainLayout/>}>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/product" element={<ProductList/>}/>
                <Route path="/product/:id" element={<ProductPage/>}/>
                <Route path="/cart" element={<CartPage/>}/>
                <Route path={"/menu"} element={<Menu/>}/>
            </Route>

            <Route path="/register" element={<Register/>}/>
            <Route path={"/login"} element={<Login/>}/>
            <Route path="/admin" element={<AdminPage/>}/>
            <Route path={"/admin/product/add"} element={<AddProduct/>}/>
        </Routes>
    )
}

export default App
