import React from "react";
import { useDispatch } from "react-redux";
import { add } from "../store/cartSlice";

function ItemCard(props) {
    const dispatch = useDispatch();

    const addToCart = (props) => {
        // dispatch an add action
        // props is payload
        dispatch(add(props))
    }


    return (
            <div className="item-card">
                {props.image_url.length > 10 ?
                <img src={props.image_url} alt={props.item_name} className="cardImage"/> :
                <div className="cardImagePlaceholder" >Item Image</div>
                }
                <div className="cardTitle">{props.item_name}</div>
                <div className="cardCategory">{props.category}</div>
                <div className="cardPrice">${props.item_price.toFixed(2)}</div>
                <div className="button-cart-div">
                <button type="button" className="button-24" onClick={() => addToCart(props)}>Add to Cart</button>
                </div>
            </div>
            )
}

export default ItemCard;