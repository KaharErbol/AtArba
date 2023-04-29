import React from "react";

function ItemCard(props) {
    return (
            <div className="card">
                {props.image_url.length > 10 ?
                <img src={props.image_url} alt={props.item_name} className="cardImage"/> :
                <div className="cardImagePlaceholder" >Item Image</div>
                }
                <div className="cardTitle">{props.item_name}</div>
                <div className="cardCategory">{props.category}</div>
                <div className="cardPrice">${props.item_price.toFixed(2)}</div>
                <div className="button-cart-div">
                <button type="button" className="button-24">Add to Cart</button>
                </div>
            </div>
            )
}

export default ItemCard;