import { useSelector, useDispatch } from "react-redux";
import "../styles.css";
import { remove, selectAllCarts, decreaseCart, add, clearCart, getTotal } from "../store/cartSlice";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { nanoid } from "@reduxjs/toolkit";

const Cart = () => {
    const productCart = useSelector(selectAllCarts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTotal());
    }, [productCart, dispatch])
    
    // const [cartItems, setCartItems] = useState({})
    const handleRemoveFromCart = (item) =>{
        dispatch(remove(item));
    }

    const handleDecreaseCart = (item) => {
        dispatch(decreaseCart(item));
    }

    const handleIncreaseCart = (item) => {
        dispatch(add(item));
    }

    const handleClearCart = () => {
        dispatch(clearCart());
    }

    return (
        <>
            <div className="cart-container">
            <h2>Shopping Cart</h2>
            {/* {JSON.stringify(productCart)} */}
            {/* {renderedCart} */}
            { productCart.cartItem.length === 0 ? (
                <div className="cart-empty">
                     <p>Your cart is empty</p>
                     <div className="start-shopping">
                        <Link to="/items">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="16" 
                                height="16" 
                                fill="currentColor" 
                                className="bi bi-arrow-left" 
                                viewBox="0 0 16 16"
                            >
                                <path 
                                    fillRule="evenodd" 
                                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                                />
                            </svg>
                            <span>Start Shopping</span>
                        </Link>
                     </div>
                </div>
            ) : (<div>
                    <div className="titles">
                        <h3 className="product-title">Item</h3>
                        <h3 className="price">Price</h3>
                        <h3 className="quantity">Quantity</h3>
                        <h3 className="total">Total</h3>
                    </div>
                    <div className="cart-items">
                        {productCart.cartItem?.map(item => (
                            <div className="cart-item" key={item.id}>
                                <div className="cart-product">
                                    <img src={item.image_url} alt={item.item_name} />
                                    <div>
                                        <h3>{item.item_name}</h3>
                                        <p>{item.item_description.substring(0, 30)}...</p>
                                        <button onClick={() => (handleRemoveFromCart(item))}>Remove</button>
                                    </div>
                                </div>
                                <div className="cart-product-price">${item.item_price}</div>
                                <div className="cart-product-quantity">
                                    <button onClick={() => handleDecreaseCart(item)}>-</button>
                                    <div className="count">{item.cartQuantity}</div>
                                    <button onClick={() => handleIncreaseCart(item)}>+</button>
                                </div>
                                <div className="cart-product-total-price">
                                    ${item.item_price * item.cartQuantity}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-summary">
                        <button className="clear-cart" onClick={() => handleClearCart()}>Clear Cart</button>
                        <div className="cart-checkout">
                            <div className="subtotal">
                                <span style={{fontSize: "20px"}}>Subtotal</span>
                                <span className="amount" style={{fontSize: "20px", fontWeight: "700"}}>${productCart.cartTotalAmount}</span>
                            </div>
                            <p style={{fontSize: "14px", fontWeight: "200", margin: "0.5rem 0"}}>Taxes and shipping calculated at checkout</p>
                            <button id="btn-checkout">Check out</button>
                            <div className="continue-shopping">
                                <Link to="/items">
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        width="16" 
                                        height="16" 
                                        fill="currentColor" 
                                        className="bi bi-arrow-left" 
                                        viewBox="0 0 16 16"
                                    >
                                        <path 
                                            fillRule="evenodd" 
                                            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                                        />
                                    </svg>
                                    <span>Continue Shopping</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            </div>
        </>
    );
}


export default Cart;