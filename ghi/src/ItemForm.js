import { useState, useEffect } from "react";

function ItemForm(){
    const [categories, setCategories] = useState([]);

    const fetchData = async () => {
        const categoriesUrl = 'http://localhost:8000/categories';
        const response = await fetch(categoriesUrl);
        if (response.ok) {
            const data = await response.json();
            setCategories(data);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
        <h1>List an Item</h1>
        <div>
            <select>
                <option value="">Categories</option>
                {categories.map(category => {
                    return (
                        <option key={category.id}>
                            {category.category}
                        </option>
                    );
                })}
            </select>
        </div>
        </>
    );
}

export default ItemForm;