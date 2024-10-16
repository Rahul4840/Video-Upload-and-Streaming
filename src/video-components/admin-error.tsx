import { Link } from "react-router-dom";


export function AdminError()
{
    return(
        <div className="container-fluid mt-2">
            <h2 className="text-danger">Invalid Credentials</h2>
            <Link to='/admin-login'>Try Again</Link>
        </div>
    );
}