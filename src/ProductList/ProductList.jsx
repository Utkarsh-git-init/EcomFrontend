import {useEffect, useState} from "react";
import ProductCard from "../productCard/ProductCard.jsx";
import styles from "./productList.module.css";

function ProductList() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const baseUrl=import.meta.env.VITE_API_BASE_URL;
        fetch(`${baseUrl}/product`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
            }
        }).then(res => res.json())
            .then(data => {
                console.log(data);
                setProducts(data);
            })
    }, []);
    return (
        <div className={styles.productList}>
            {
                products.map((product, index) => (
                    <div className={styles.product} key={index}>
                        <ProductCard product={product} key={index} />
                    </div>

                ))
            }
        </div>
    )
}
export default ProductList;