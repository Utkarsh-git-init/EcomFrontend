import {useEffect, useState} from "react";
import CartItemCard from "./cartItemCard/CartItemCard.jsx";

function CartPage() {
    const [cart, setCart] = useState(null);
    useEffect(() => {
        const baseUrl=import.meta.env.VITE_API_BASE_URL;
        fetch(baseUrl+"/cart",{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'authorization': localStorage.getItem('token'),
            }
        })
        .then(res => res.json())
        .then(data => {
            setCart(data);
            console.log(data);
        })
    },[])
    if(!cart){
        return <div>Loading...</div>;
    }
    return (
        <>
            {
                cart.map(item => (
                    <CartItemCard cartItem={item} key={item.cartItemId}/>
                ))
            }
        </>
    )
}
export default CartPage;