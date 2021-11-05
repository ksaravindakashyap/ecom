import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import  {createCategory} from "./helper/adminapicall"


const AddCategory = () => {

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

    const onSubmit = (event) => {
        event.preventDefault();
        seterror("")
        setsuccess(false)
    
        //backend request fired
        createCategory(user._id, token, {name})
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
                    return <h4 className="text-success">Category created successfully</h4>
                }
        }

        const warningMessage = () => {
            if (error) {
                return <h4 className="text-success">failed to create category</h4>
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
                    <button onClick={onSubmit} className="btn btn-outline-info">Create category</button>
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



export default AddCategory;