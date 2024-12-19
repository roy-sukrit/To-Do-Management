import { useEffect, useState } from 'react';
import { useCategoryState } from '../../contexts/CategoryContext'
import CategoryItem from './CategoryItem';


const CategoryList = ({category,handleCategorySelect,setCurrentCategory,categoryHandler,userEmail}) => {


    const [categoryList,setCategories] = useState([])


    // useEffect(()=>{
    //     console.log("CategoryList->",category);
    //     setCategories([...categoryList,category])
    // },[category])


    // Sync `categoryList` with the `category` prop
    useEffect(() => {
        console.log("CategoryList->",category);
        setCategories(category);
    }, [category]);

    const categoryState = useCategoryState();


    const CategoryListData = category.map((item) => (

        <CategoryItem handleCategorySelect={handleCategorySelect}
        setCurrentCategory={setCurrentCategory}
        userEmail={userEmail}
        setCategories={setCategories}
        category={category}
        categoryHandler={categoryHandler}
        categoryList={categoryList}
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
