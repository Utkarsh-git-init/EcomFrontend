import './header.css'
import { IoCartOutline, IoMenu  } from "react-icons/io5";
import {Link} from "react-router-dom";

function Header(){

    return (
        <div className="header">
            <div>
                <IoMenu size={30} color="hotpink"/>
            </div>
            <div>
                <Link to="/">
                    <p className="header-title">ECOM</p>
                </Link>
            </div>
            <div>
                <Link to="/cart">
                    <IoCartOutline color="hotpink" size={30} />
                </Link>
            </div>
        </div>
    )
}
export default Header;