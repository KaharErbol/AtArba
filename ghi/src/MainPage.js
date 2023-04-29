import "./styles.css";
import React, { useState } from "react";
import { useGetItemsQuery } from "./store/itemsApi";
import ErrorNotification from "./ErrorNotification";
import ItemDetail from "./ItemDetail";
import ItemCard from "./components/ItemCard";


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
            {data.map((item) => {
                return (
                    <ItemCard key={item.id} {...item} />
                )
            })}
        </div>
        </>
    );
}

export default MainPage;