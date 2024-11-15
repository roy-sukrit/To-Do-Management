import { useEffect, useState } from 'react';
import { useCategoryState } from '../../contexts/CategoryContext'
import CategoryItem from './CategoryItem';


const CategoryList = ({category}) => {


    const [categoryList,setCategories] = useState([])
    console.log("categories CategoryList",category);
    useEffect(()=>{
        console.log("category list",category);
        setCategories([...categoryList,category])
    },[category])
    const categoryState = useCategoryState();
    const CategoryList = category.map(item => (
        <CategoryItem
            key={item._id}
            id={item._id}
            name={item.name}
            slug={item.slug} />
    ))

    return (
        <nav className='relative flex-col w-full'>
            {CategoryList}
        </nav>
    )
}

export default CategoryList
