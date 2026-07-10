import {useState} from "react";
import styles from "./ProductPageMiddle.module.css";
import Counter from "../../components/counter/Counter.jsx";

function ProductPageMiddle({ product }) {
    const [variant,setVariant] = useState(product.variants[0]); //variant
    const [quantity,setQuantity] = useState(1);
    const addToCart = () => {
        const baseUrl=import.meta.env.VITE_API_BASE_URL;
        fetch(`${baseUrl}/cart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'authorization': localStorage.getItem('token')
            },
            body: JSON.stringify({
                productVariantId: variant.variantId,
                quantity: quantity,
            })
        }).then(res => res.text())
        .then(res => {
            console.log(res);
        })
    }
    return (
        <div className={styles.productPageMiddle}>
            <div>
                <p>{product.title}</p>
                <p><s>Rs. {variant.mrp}</s></p>
                <p> Rs. {Math.round(variant.mrp * ((100 - variant.discount) / 100))}</p>
            </div>
            <div className={styles.sizes}>
                {product.variants.map((v, index) => (
                    <div key={index}
                         className={`${styles.sizeBox} ${v.size===variant.size?styles.active:""}`}
                         onClick={() => setVariant(product.variants[index])}>
                        <p>{v.size}</p>
                    </div>
                ))}
            </div>
            <div className={styles.buyNowBox}>
                COD AVAILABLE
            </div>
            <div>
                <label>Quantity:</label>
                <Counter count={quantity} setCount={setQuantity} />
            </div>
            <div className={styles.buyNowBox}>
                <button>
                    BUY NOW
                </button>
            </div>
            <div className={styles.buyNowBox}>
                <button onClick={addToCart}>
                    ADD TO CART
                </button>
            </div>

        </div>
    )
}
export default ProductPageMiddle;