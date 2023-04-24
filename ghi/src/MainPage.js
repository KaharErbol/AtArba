import "./styles.css";

function MainPage(props){
    const items = props.items;

    return(
        <>
        <h1>Main Page</h1>
        <div className="cardContainer">
            {items.map((item, index) => {
                return (
                <div className="card" key={item.id}>
                    {item.image_url.length > 10 ?
                    <img src={item.image_url} alt={item.item_name} className="cardImage" /> :
                    <div className="cardImagePlaceholder">Item Image</div>
                    }
                    <div className="cardTitle">{item.item_name}</div>
                    <div className="cardCategory">{item.category}</div>
                    <div className="cardPrice">${item.item_price.toFixed(2)}</div>
                    <button className="cardButton">Detail</button>
                </div>
                )
            })}
        </div>
        </>
    );
}

export default MainPage;