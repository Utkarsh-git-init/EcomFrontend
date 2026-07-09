import styles from './CartItemCard.module.css';
import {useState} from "react";
import {Link} from "react-router-dom";

function CartItemCard({cartItem}) {
    const product = cartItem.product;
    const [quantity, setQuantity] = useState(cartItem.quantity);
    return (
        <div className={styles.card}>
            <Link to={`/product/${product.prodId}`}>
                <img src={product.images[0].url} alt={cartItem.title}/>
            </Link>

            <div>
                <p>{product.title}</p>
                <div>
                    <label>Quantity:</label>
                    <input type={"number"}
                           value={quantity}
                           step={1}
                           onChange={(e) => {
                               const val = e.target.value;
                               setQuantity(val === "" ? "" : Number(val));
                           }} />
                </div>
            </div>
        </div>
    )
}
export default CartItemCard;