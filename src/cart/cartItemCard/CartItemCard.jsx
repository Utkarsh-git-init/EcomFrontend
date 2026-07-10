import styles from './CartItemCard.module.css';
import {useState} from "react";
import {Link} from "react-router-dom";
import Counter from "../../components/counter/Counter.jsx";

function CartItemCard({cartItem}) {
    const product = cartItem.product;
    let variant;
    for(const v of product.variants){
        if(v.variantId === cartItem.variantId){
            variant = v;
        }
    }
    const [quantity, setQuantity] = useState(cartItem.quantity);
    return (
        <div className={styles.card}>
            <Link to={`/product/${product.prodId}`}>
                <img src={product.images[0].url} alt={cartItem.title}/>
            </Link>
            <div className={styles.details}>
                <p>{product.title}</p>
                <p>size: {variant.size}</p>
                <p> Rs. {Math.round(variant.mrp * ((100 - variant.discount) / 100))}</p>
                <Counter count={quantity} setCount={setQuantity} />
            </div>
        </div>
    )
}
export default CartItemCard;