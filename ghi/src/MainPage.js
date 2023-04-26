import "./styles.css";
import { useGetItemsQuery } from "./store/itemsApi";
import ErrorNotification from "./ErrorNotification";


function MainPage(){
    // const items = props.items;
    const {data, error, isLoading} = useGetItemsQuery();

    if(isLoading) {
        return (
            <progress className="progress is-primary" max="100" ></progress>
        );
    }

    return(
        <>
        <ErrorNotification error={error} />
        <div className="cardContainer">
            {data.map((item, index) => {
                return (
                <div className="card" key={item.id}>
                    {item.image_url.length > 10 ?
                    <img src={item.image_url} alt={item.item_name} className="cardImage" /> :
                    <div className="cardImagePlaceholder">Item Image</div>
                    }
                    <div className="cardTitle">{item.item_name}</div>
                    <div className="cardCategory">{item.category}</div>
                    <div className="cardPrice">${item.item_price.toFixed(2)}</div>
                    <div className="button-cart-div">
                    <button type="button" className="button-24">Add to Cart</button>
                    </div>
                </div>
                )
            })}
        </div>
        </>
    );
}

export default MainPage;