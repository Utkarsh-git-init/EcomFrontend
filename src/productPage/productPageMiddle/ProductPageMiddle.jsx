import {useState} from "react";
import styles from "./ProductPageMiddle.module.css";

function ProductPageMiddle({ product }) {
    const [variant,setVariant] = useState(product.variants[0]); //variant
    const [quantity,setQuantity] = useState(0);
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
            <p>{product.title}</p>
            <p><s>Rs. {variant.mrp}</s></p>
            <p> Rs. {Math.round(variant.mrp * ((100 - variant.discount) / 100))}</p>
            <div className={styles.sizes}>
                {product.variants.map((v, index) => (
                    <div key={index}
                         className={`${styles.sizeBox} ${v.size===variant.size?styles.active:""}`}
                         onClick={() => setVariant(product.variants[index])}>
                        <p>{v.size}</p>
                    </div>
                ))}
            </div>
            <div>
                COD AVAILABLE
            </div>
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
            <div>
                <div>
                    <button>
                        BUY NOW
                    </button>
                </div>
                <div>
                    <button onClick={addToCart}>
                        ADD TO CART
                    </button>
                </div>
            </div>

        </div>
    )
}
export default ProductPageMiddle;