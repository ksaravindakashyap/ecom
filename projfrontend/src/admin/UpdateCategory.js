import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import  { getCategories, updateCategory} from "./helper/adminapicall"


const UpdateCategory = ({match}) => {

    const [name, setname] = useState("")
    const [error, seterror] = useState(false)
    const [success, setsuccess] = useState(false)

    const {user, token} = isAuthenticated()

    const goBack = () => (
        <div className="mt-5 px-5">
            <Link className="btn btn-sm btn-success mb-3 " to="/admin/dashboard">Admin Home</Link>
        </div>
    )


    const handleChange = event => {
        seterror("")
        setname(event.target.value)
    }

    // const preload = (categoryId) => {
    //     getCategories(categoryId).then((data) => {
    //       if (data.error) {
    //         setname({ ...name, error: data.error });
    //       } else {
    //         setname({
    //             ...name,
    //             category: data.category._id,
    //             // formData: new FormData(),
    //         });
    //         preloadCategories()
    //         //console.log(categories);
    //       }
    //     });
    //   };
    
    //     const preloadCategories = () => {
    //             getCategories().then(data => {
    //                 if(data.error){
    //                     setname({ ...name, error: data.error });
    //                 }else{
    //                     setname({
    //                         categories: data, 
    //                         //formData: new FormData()
    //                     })
    //                 }
    //             })
    //     }  
    
    //   useEffect(() => {
    //     preload(match.params.productId);
    //   }, []);


    const onSubmit = (event) => {
        event.preventDefault();
        seterror("")
        setsuccess(false)
    
        //backend request fired
        updateCategory(match.params.categoryId, user._id, token)
            .then((data) => {
                if(data.error){
                seterror(true)
            }else{
                seterror("")
                setsuccess(true);
                setname('')
            }
            })

    }
        const successMessage = () => {
                if (success) {
                    return <h4 className="text-success">Category  updated successfully</h4>
                }
        }

        const warningMessage = () => {
            if (error) {
                return <h4 className="text-success">failed to update category</h4>
            }
    }

        const myCategoryForm = () =>
        (
            <form>
                <div className="form-group mx-5">
                    <p className="lead">Enter the category</p>
                    <input type="text" 
                    className="form-control my-1"
                    onChange={handleChange}
                    value={name}
                    autoFocus
                    required
                    placeholder="For ex. summer"
                    />
                    <button onClick={onSubmit} className="btn btn-outline-info">Update category</button>
                </div>
            </form>
        )

    return(
        <Base title="Create a category here"
        description="Add a new tshirt here"
        className="container bg-info p-4">
            <div className="rwo bg-white rounded">
                <div className="col-md-8 off-md-2">
                    {successMessage()}
                    {warningMessage()}
                    {myCategoryForm()}
                    {goBack()}
                </div>
            </div>
        </Base>
        )


}



export default UpdateCategory;