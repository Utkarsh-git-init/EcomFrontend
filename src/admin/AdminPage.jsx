import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import './adminPage.css'
import AdminPageProductCard from "../adminPageProductCard/AdminPageProductCard.jsx";

function AdminPage() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const baseurl=import.meta.env.VITE_API_BASE_URL;
        fetch(baseurl+"/product", {
            method: "GET",
            Accept: "application/json",
        }).then(res => res.json())
        .then(res => {
            console.log(res);
            setProducts(res);
        })
    },[])
    return (
        <div className={"admin-page-container"}>
            <div className="product-list">
                {
                    products.map((product, index) => (
                        <AdminPageProductCard key={index} product={product}/>
                    ))
                }
            </div>
            <Link to={"/admin/product/add"} >
                <button>Add Product</button>
            </Link>
        </div>
    )
}
export default AdminPage;