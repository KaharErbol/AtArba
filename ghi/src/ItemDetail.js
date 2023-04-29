function ItemDetail(props) {
    return (
        <>
        <h1>Item Detail</h1>
        <div>
            {props.item.item_name}    
        </div>
        </>
    );
}

export default ItemDetail;