import { useEffect, useState } from "react";
import { VideoContract } from "../contracts/VideoContract";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";


export function AdminDashboard()
{

    const [videos, setVideos] = useState<VideoContract[]>();
    const [cookie, setCookie, removeCookie] = useCookies(['admin-id'])

    let navigate = useNavigate()


    function LoadVideos():void {
        axios.get(`http://127.0.0.1:7000/get-videos`)
        .then(response => {
            setVideos(response.data);
        });
    };

    function handleSignout(){
        removeCookie('admin-id');
        navigate('/');
    }

    useEffect(()=> {
        if(cookie["admin-id"] == undefined){
            navigate('/admin-login');                  
        } 
        else {
            LoadVideos();
        }
        
    },[]);

    function handleRemoveClick(id: number){
        axios.delete(`http://127.0.0.1:7000/delete-video/${id}`)
        alert('Video Deleted');
        window.location.reload();
    }


    return(
        <div>
            <h2 className="d-flex justify-content-between my-3 text-white">Admin Dashboard - [ {cookie['admin-id']} ]  <button  onClick={handleSignout} className="btn btn-danger">Signout</button></h2>
            <div className="my-2">
                <Link to='/add-video' className="btn btn-primary bi bi-camera-video"><span className="ms-2">Add Video</span></Link>
            </div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Preview</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            videos?.map(video => 
                                <tr key={video.VideoId}>
                                    <td>{video.Title}</td>
                                    <td>
                                        <iframe src={video.Url} width="250" height="150"></iframe>
                                    </td>
                                    <td>
                                        <Link to={`/edit-video/${video.VideoId}`} className="btn btn-warning"><span className="bi bi-pen-fill"></span></Link>
                                        <button onClick={()=> handleRemoveClick(video.VideoId)} className="btn btn-danger ms-3"><span className="bi bi-trash"></span></button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
        </div>
    );
}