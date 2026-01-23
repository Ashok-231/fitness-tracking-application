import { useEffect, useState } from "react";
import { getCategories } from "../../services/categoryService";

const CategoryList = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories()
            .then((res) => {
                setCategories(res.data);
            })
            .catch((err) => {
                console.error("Error loading categories", err);
            });
    }, []);

    return (
        <div>
            <h2>Categories</h2>
            <ul>
                {categories.map((cat) => (
                    <li key={cat.id}>{cat.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryList;



