import { useEffect, useState } from "react";
import { VideoContract } from "../contracts/VideoContract";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate, Link } from "react-router-dom";


export function UserDashboard()
{
    const [videos, setVideos] = useState<VideoContract[]>();
    const [cookie, setCookie, removeCookie] = useCookies(['user-id']);
    
    let navigate = useNavigate();

    function LoadVideos(){
        axios.get('http://127.0.0.1:7000/get-videos')
        .then(response=> {
            setVideos(response.data);
        });
    };

    function handleSignout(){
        removeCookie('user-id');
        navigate('/');
    }

    useEffect(()=>{
        if(cookie["user-id"] == undefined){
            navigate('/user-login');                  
        } else {
            LoadVideos();
        }

    },[]);


    return(
        <div>
            <header className="text-center fs-2 text-white fw-bold">Dashboard </header>
            <div className="d-flex justify-content-between">
                <span className="fs-3 fw-bold text-white">[ {cookie['user-id']} ]</span>
                <button  onClick={handleSignout} className="btn btn-danger">Signout</button>
            </div>
            <nav className="text-center me-4 text-white">
                <Link to='/user-dashboard' className="ms-5 fs-4 fw-bold text-white text-decoration-none">Home</Link>
                <Link to='/video-category' className="ms-2 fs-4 fw-bold text-white text-decoration-none">Category</Link>
            </nav>
            <main className="d-flex flex-wrap">
                {
                    videos?.map(video=> 
                        <div className="card m-3 p-2" style={{width:'300px'}}>
                            <div className="card-header">
                                {video.Title}
                            </div>
                            <div className="card-body">
                                <iframe src={video.Url} width='100%' height='180'></iframe>
                            </div>
                            <div className="card-footer">
                                <span className="bi bi-hand-thumbs-up me-3">{video.Likes}</span>
                                <span className="bi bi-hand-thumbs-down">{video.Dislikes}</span>
                            </div>
                        </div>
                    )
                }
            </main>
        </div>
    );
}