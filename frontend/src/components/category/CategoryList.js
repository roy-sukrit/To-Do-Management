import { useEffect, useState } from 'react';
import { useCategoryState } from '../../contexts/CategoryContext'
import CategoryItem from './CategoryItem';


const CategoryList = ({category,handleCategorySelect,setCurrentCategory}) => {


    const [categoryList,setCategories] = useState([])


    useEffect(()=>{
        console.log("CategoryList->",category);
        setCategories([...categoryList,category])
    },[category])


    const categoryState = useCategoryState();


    const CategoryListData = category.map((item) => (

        <CategoryItem handleCategorySelect={handleCategorySelect}
        setCurrentCategory={setCurrentCategory}
        setCategories={setCategories}
        category={category}
            key={item._id}
            id={item._id}
            name={item.name}
            slug={item.slug} />
    ))

    return (
        <nav className='relative flex-col w-full'>
            {CategoryListData}
        </nav>
    )
}

export default CategoryList
