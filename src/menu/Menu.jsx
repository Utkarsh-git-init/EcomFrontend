import {Link} from "react-router-dom";
import styles from "./Menu.module.css";

function Menu() {
    return (
        <div className={styles.menu}>
            <Link to="/login">
                SIGN IN
            </Link>
            <Link to="/register">
                SIGN UP
            </Link>
        </div>
    )
}
export default Menu;