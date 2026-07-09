import './productCard.module.css'
import styles from './productCard.module.css'
import {Link} from "react-router-dom";

function ProductCard({product}) {
    return (
        <div className={styles.productCard}>
            <Link to={`/product/${product.prodId}`}>
                <img src={product.images[0]?.url} alt="" />
            </Link>
            <div className={styles.productCardDetails}>
                <Link to={`/product/${product.prodId}`}>
                    <span>{product.title}</span>
                </Link>

                <div>
                    <span style={{color:"Hotpink"}} className="productCard-details__mrp"><s>Rs. {product.variants[0].mrp}</s></span>
                    <span> Rs. {Math.round(product.variants[0].mrp * ((100 - product.variants[0].discount) / 100))}</span>
                </div>
                <div className={styles.productCardDetailsDiscount}>
                    <span>{product.variants[0].discount}% off</span>
                </div>
            </div>
        </div>
    )
}
export default ProductCard;