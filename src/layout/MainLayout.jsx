import {Outlet} from "react-router-dom";
import Header from "../header/Header.jsx";

function MainLayout() {
    return (
        <>
            <Header/>
            <Outlet/>
        </>
    )
}
export default MainLayout;