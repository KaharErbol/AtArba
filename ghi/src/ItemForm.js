import { useState, useEffect } from "react";
import { useGetCategoriesQuery } from "./store/categoriesApi";
import ErrorNotification from "./ErrorNotification";
import { useCreateItemMutation } from "./store/itemsApi";
import { useNavigate } from "react-router-dom";

function ItemForm(){
    // const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const [err, setError] = useState('');
    const { data, error, isLoading } = useGetCategoriesQuery();
    const [createItem, result] = useCreateItemMutation();

    const [category, setCategory] = useState('');
    const [itemName, setItemName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [description, setDescription] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState('');
    const [listedDate, setListedDate] = useState('');

    const handleCategoryChange = e => {
        setCategory(e.target.value);
    }

    const handleItemNameChange = e => {
        setItemName(e.target.value);
    }

    const handleImageChange = e => {
        setImageUrl(e.target.value);
    }

    const handleDescription = e => {
        setDescription(e.target.value);
    }

    const handleBrand = e => {
        setBrand(e.target.value);
    }

    const handlePrice = e => {
        setPrice(e.target.value);
    }

    const handleDate = e => {
        setListedDate(e.target.value);
    }

    if(isLoading) {
        return (
            <progress className="progress is-primary" max="100" ></progress>
        );
    }
    
    async function handleSubmit(e) {
        e.preventDefault();
        createItem({itemName, category, imageUrl, description, brand, price, listedDate});
    }

    if (result.isSuccess) {
        navigate('/items');
    } else if (result.isError) {
        setError(result.error);
    }

    return (
        <>
        <h2>Sell your part here</h2>
        <ErrorNotification error={error} />
        <div className="body-list-item">
            <form onSubmit={handleSubmit}>
                <select required name="category" id="category" value={category} onChange={handleCategoryChange}>
                    <option value="">Categories</option>
                    {data.map(category => {
                        return (
                            <option key={category.id}>
                                {category.category}
                            </option>
                        );
                    })}
                </select>
                <input 
                    label='item_name'
                    id='item_name'
                    placeholder="Item Name"
                    value={itemName}
                    onChange={handleItemNameChange}
                    type='text'
                    required
                />
                <input 
                    label='image_url'
                    id='image_url'
                    placeholder="Image URL"
                    value={imageUrl}
                    onChange={handleImageChange}
                    type="url"
                />
                <input 
                    label='item_description'
                    id='item_description'
                    placeholder="Description"
                    value={description}
                    onChange={handleDescription}
                    type="text"
                    required
                />
                <input 
                    label='brand'
                    id='brand'
                    placeholder="Brand"
                    value={brand}
                    onChange={handleBrand}
                    type="text"
                    required
                />
                <input 
                    label='item_price'
                    id='item_price'
                    placeholder="Price"
                    value={price}
                    onChange={handlePrice}
                    type="number"
                    required
                />
                <input 
                    label='listed_date'
                    id='listed_date'
                    placeholder="Listed Date"
                    value={listedDate}
                    onChange={handleDate}
                    type="date"
                    required
                />
                <button className="button-24" >Submit</button>
            </form>
        </div>
        </>
    );
}

export default ItemForm;