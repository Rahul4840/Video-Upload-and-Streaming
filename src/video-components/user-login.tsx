import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import axios from "axios";


export function UserLogin()
{

    let navigate = useNavigate();
    const [cookie, setCookie, removeCookie] = useCookies(['user-id']);

    const formik = useFormik({
        initialValues: {
            UserId: '',
            Password: ''
        },
        onSubmit: (users) => {
            axios.get(`http://127.0.0.1:7000/get-users`)
            .then(response => {
                var user = response.data.find((item:any)=> item.UserId===users.UserId);
                if(user) {
                    if(users.Password===user.Password)
                        {
                            alert('User Login Successfully')
                            setCookie('user-id', users.UserId);
                            navigate('/user-dashboard');
                        } else {
                            navigate('/error');
                        }
                } else {
                    navigate('/error');
                }
            })
        }
    })

 
        // style={{margin:"200px 0 0 550px"}} 

    return(
        <div className=" container w-25 border border-2 border-black rounded p-4 m-2 bg-light">
            <form onSubmit={formik.handleSubmit}>
                <h3 className="bi bi-person-fill">User Login</h3>
                <dl>
                    <dt>UserId</dt>
                    <dd><input type="text" name="UserId" className="form-control" onChange={formik.handleChange}  /></dd>
                    <dt>Password</dt>
                    <dd><input type="password" name="Password" className="form-control" onChange={formik.handleChange}  /></dd>
                </dl>
                <button className="btn btn-success">Login</button>
                <Link to='/user-register' className="btn btn-danger ms-4">Cancel</Link>
            </form>
        </div>
    );
}