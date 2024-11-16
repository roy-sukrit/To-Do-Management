import { useCategoryDispatch } from '../../contexts/CategoryContext';
import { usePathState } from '../../contexts/PathContext';
import { FaTrash, FaRegHeart } from "react-icons/fa";
import { useTodoState } from '../../contexts/TodoConext'
import {deleteCategory} from '../../api/services/todo.service'

const CategoryItem = ({ id,
     name,
    slug,
     handleCategorySelect,
     setCurrentCategory,
     category,
     setCategories }) => {


    const categoryDispath = useCategoryDispatch();
    const { changePath } = usePathState();
    const todoState = useTodoState();
    const filterCategoryCount = todoState.filter(item => item.category[0].slug === slug).length
    
    const handleRemove = (e) => {
        e.preventDefault();
        e.stopPropagation(); // Prevent triggering `onSelect` on button click

        categoryDispath({ type: "REMOVE", id })
        deleteCategoryAPI(id)
        changePath('/')
    }

    const deleteCategoryAPI = async(id) => {


        console.log("deleteCategoryAPI Func Before->",category);

        const deleteCategry = await deleteCategory(id);

        console.log("deleteCategry",deleteCategry);



    console.log("deleteCategoryAPI Func After->",category);
    const updatedCategories = category.filter((cat) => cat._id !== id);

    console.log("updatedCategories",updatedCategories);

    // Determine the new current category
    const previousCategory = updatedCategories.length > 0 ? updatedCategories[0] : null;

    console.log("previousCategory",previousCategory);
    // Update state
    setCategories(updatedCategories);
    setCurrentCategory(previousCategory._id);

    }

    return (
        <div 
            id="category-items"
            onClick={()=>handleCategorySelect(id) }
            className='flex flex-nowrap flex-row w-full justify-between 
            bg-gray-100 p-5 my-3 rounded-lg'>
            <FaRegHeart
                className='m-1 mr-6 text-rose-500' />
            <div
                className='w-5/6'
                id='left'>
                <p className='text-gray-700'>
                    {name}
                </p>
            </div>
            <div
                id='right'
                className='flex flex-row'>
                <span
                    id='todo-count'
                    className='bg-gray-300 w-7 h-7 rounded-md mr-1 
                    relative grid justify-center items-center'>
                    <p className='text-gray-500 text-sm'>{filterCategoryCount}</p>
                </span>
                {slug == '/' ?
                    (<span></span>)
                    :
                    (<span
                        className='bg-gray-300 w-7 h-7 rounded-md
                       relative grid justify-center items-center'>
                        <button
                            id='remove-category'
                            className='text-gray-500 text-sm'
                            onClick={handleRemove}>
                            <FaTrash
                                className='text-gray-500' />
                        </button>
                    </span>)
                }
            </div>
        </div>
    )
}



export default CategoryItem
