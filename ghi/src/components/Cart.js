import { useSelector, useDispatch } from "react-redux";
import "../styles.css";
import { remove } from "../store/cartSlice";
import { useState } from "react";

const Cart = () => {
    const productCart = useSelector( state => state.cart);
    const dispatch = useDispatch();
    const removeFromCart = (id) => {
        // dispatch a remove action
        dispatch(remove(id))
    }
    // const [cartItems, setCartItems] = useState({})
    let cartItems = {};
    return (
        <>
            <h2>Cart</h2>
            {/* {JSON.stringify(productCart)} */}
            {productCart.map((product) => {
                if (product.id in cartItems) {
                    cartItems[product.id] += 1;

                } else {
                    cartItems[product.id] = 1;
                }
                return (
                <div className='cart-row' key={product.id}>
                    <div className="card w-75 mb-3">
                        <div className="card-body">
                            <h5 className="card-title">{product.item_name}</h5>
                            <p className="card-text">Amount: {cartItems[product.id]}</p>
                            <button onClick={() => removeFromCart(product.id)}>Remove</button>
                        </div>
                    </div>
                </div>
                )
            })}
        </>
    );
}


export default Cart;