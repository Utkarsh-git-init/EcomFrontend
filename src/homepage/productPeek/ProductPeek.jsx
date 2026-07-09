import {useEffect, useState} from "react";
import ProductCard from "../../productCard/ProductCard.jsx";
import './productPeek.css'
import {Link} from "react-router-dom";

function ProductPeek() {
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
        <div className="productPeek">
            <div className="productPeekHeader">
                <Link to={"/product"}>
                    <span>OUR PRODUCTS</span>
                </Link>
                <Link to={"/product"}>
                    <span>SEE ALL</span>
                </Link>
            </div>

            <div className="productPeek-list">
                {
                    products.slice(0,5).map(product => (
                        <ProductCard key={product.prodId} product={product} />
                    ))
                }
            </div>
        </div>
    )
}
export default ProductPeek;