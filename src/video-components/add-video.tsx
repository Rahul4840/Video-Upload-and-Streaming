import { useEffect, useState } from "react";
import { CategoriesContract } from "../contracts/CategoriesContract";
import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";


export function AddVideo()
{

    const [categories, setCategories] = useState<CategoriesContract[]>();
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            VideoId: 0,
            Title: '',
            Url: '',
            Description: '',
            Likes: 0,
            Dislikes: 0,
            CategoryId: 0,
        },
        onSubmit: (video)=> {
            axios.post('http://127.0.0.1:7000/add-video', video)
            .then(()=> {
                alert('Video Added Successfully..');
                navigate('/admin-dashboard');
            })
        }
    })

    function LoadCategories(){
        axios.get('http://127.0.1:7000/get-categories')
        .then(response => {
            response.data.unshift({CategoryId:'-1', CategoryName:'Select a Category'});
            setCategories(response.data);
        });
    };


    useEffect(()=>{

        LoadCategories();

    },[])


    return(
        <div className="contaimer-fluid">
            <h2 className="text-white ms-2">Add New Video</h2>
            <form onSubmit={formik.handleSubmit} className="w-50 border border-2 border-black rounded p-3 m-2 bg-light">
                <dl className="row">
                    <dt className="col-3">Video Id</dt>
                    <dd className="col-9"><input type="number" name="VideoId" className="form-control" onChange={formik.handleChange} /></dd>
                    <dt className="col-3">Title</dt>
                    <dd className="col-9"><input type="text" name="Title" className="form-control" onChange={formik.handleChange} /></dd>
                    <dt className="col-3">Url</dt>
                    <dd className="col-9"><input type="text" name="Url" className="form-control" onChange={formik.handleChange} /></dd>
                    <dt className="col-3">Description</dt>
                    <dd className="col-9">
                        <textarea name="Description" rows={4} cols={40} className="form-control" onChange={formik.handleChange} ></textarea>
                    </dd>
                    <dt className="col-3">Likes</dt>
                    <dd className="col-9"><input type="number" name="Likes" className="form-control" onChange={formik.handleChange} /></dd>
                    <dt className="col-3">Dislikes</dt>
                    <dd className="col-9"><input type="number" name="Dislikes" className="form-control" onChange={formik.handleChange} /></dd>
                    <dt className="col-3">Select Category</dt>
                    <dd className="col-9">
                        <select name="CategoryId" className="form-control" onChange={formik.handleChange}>
                            {
                                categories?.map(category => 
                                    <option key={category.CategoryId} value={category.CategoryId}>{category.CategoryName}</option>
                                )
                            }
                        </select>
                    </dd>
                </dl>
                <button className="btn btn-primary">Add</button>
                <Link to="/admin-dashboard" className="btn btn-danger ms-3">Cancel</Link>
            </form>
        </div>
    );
}