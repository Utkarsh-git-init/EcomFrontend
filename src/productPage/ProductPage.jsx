import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import styles from "./ProductPage.module.css";
import ProductGallery from "./productGallery/ProductGallery.jsx";
import ProductPageMiddle from "./productPageMiddle/ProductPageMiddle.jsx";

function ProductPage() {
    const {id}= useParams();
    const [product, setProduct] = useState(null);
    useEffect(() => {
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        fetch(`${baseUrl}/product/${id}`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        }).then(res => res.json())
        .then(data => {
            console.log(data);
            setProduct(data);
        })
    },[])
    if(!product)
        return (
            <div>
                loading
            </div>
        )
    return (
        <div className={styles.productPage}>
            <ProductGallery images={product.images} />
            <ProductPageMiddle product={product} />
        </div>
    )
}
export default ProductPage;