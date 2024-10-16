import { Link } from "react-router-dom";

export function VideoHome()
{
    return(
        <div className="d-flex justify-content-center align-items-center" style={{height:'100vh'}} >
            <Link to="/admin-login" className="btn btn-primary me-1">Admin Login</Link>
            <Link to="/user-register" className="btn btn-dark ms-1">New User Register</Link>
        </div>
    );
}