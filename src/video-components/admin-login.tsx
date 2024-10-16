import axios from "axios";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

export function AdminLogin()
{

    let navigate = useNavigate();
    const [cookie, setCookie, removeCookie] = useCookies(['admin-id']);

    const formik = useFormik({
        initialValues: {
            UserId: '',
            Password: ''
        },
        onSubmit: (admin) => {
            axios.get(`http://127.0.0.1:7000/get-admin`)
            .then(response => {
                var user = response.data.find((item:any)=> item.UserId===admin.UserId);
                if(user){
                    if(admin.Password===user.Password)
                        {
                            setCookie('admin-id', admin.UserId);
                            navigate('/admin-dashboard');
                        } else {
                            navigate('/error');
                        }
                } else {
                    navigate('/error');
                }
            })
        }
    })

  

    return(
        <div className="container-fluid">
            <form onSubmit={formik.handleSubmit} className="border border-2 border-dark w-25 rounded p-3 m-1 mt-2 bg-light">
                <h3 className="bi bi-person-fill">Admin Login</h3>
                <dl>
                    <dt>User Id</dt>
                    <dd><input type="text" name="UserId" className="form-control" onChange={formik.handleChange} /></dd>
                    <dt>Password</dt>
                    <dd><input type="password" name="Password" className="form-control" onChange={formik.handleChange} /></dd>
                </dl>
                <button type="submit" className="btn btn-primary">Login</button>
                <Link to='/user-register' className="btn btn-dark ms-2">Cancel</Link>
            </form>
        </div>
    );
}