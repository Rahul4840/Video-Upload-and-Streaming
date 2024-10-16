import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


export function UserRegister()
{

    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            UserName: '',
            UserId: '',
            Password: '',
            Mobile: 0,
            Email:''
        },
        onSubmit: (form) => {
            axios.post(`http://127.0.0.1:7000/register-user`, form)
            .then(()=> {
                alert('User Register Successfully..');
                navigate('/user-login');
            });
        }
    });


    return(
        <div className="container-fluid">
            <form onSubmit={formik.handleSubmit} className="w-25 border border-2 border-black rounded p-4 m-2 mt-4 bg-light">
            <h3 className="bi bi-person-fill-add">New User Register</h3>
            <dl className="row mt-4">
                <dt className="col-3">UserName</dt>
                <dd className="col-9"><input type="text" name="UserName" className="form-control" onChange={formik.handleChange} required/></dd>
                <dt className="col-3">UserId</dt>
                <dd className="col-9"><input type="text" name="UserId" className="form-control" onChange={formik.handleChange} required/></dd>
                <dt className="col-3">Password</dt>
                <dd className="col-9"><input type="password" name="Password" className="form-control" onChange={formik.handleChange} required/></dd>
                <dt className="col-3">Mobile</dt>
                <dd className="col-9"><input type="number" name="Mobile" className="form-control" onChange={formik.handleChange} required/></dd>
                <dt className="col-3">Email</dt>
                <dd className="col-9"><input type="text" name="Email" className="form-control" onChange={formik.handleChange} required/></dd>
            </dl>
            <button className="btn btn-primary">Register</button>
            <Link to='/'className="btn btn-danger ms-4">Cancel</Link>
            </form>
        </div>
    );
}