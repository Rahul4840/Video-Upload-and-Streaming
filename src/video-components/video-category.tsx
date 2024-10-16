import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { VideoContract } from "../contracts/VideoContract";
import { CategoriesContract } from "../contracts/CategoriesContract";

export function VideoCategory() {
    const [videos, setVideos] = useState<VideoContract[]>();
    const [cookies, setCookies, removeCookies] = useCookies(['user-id']);
    const [categories, setCategories] = useState<CategoriesContract[]>();
    const [categoriesId, setCategoriesId] = useState<string>("");
    let navigate = useNavigate();
    let params = useParams();

    function handleSignout() {
        removeCookies('user-id');
        navigate('/');
    }

    function VideoCat() {
        axios.get('http://127.0.0.1:7000/get-categories')
            .then(response => {
                const updatedCategories = [{ CategoryId: '-1', CategoryName: 'Select Category' }, ...response.data];
                setCategories(updatedCategories);
            })
            .catch(error => {
                console.error("There was an error fetching the categories!", error);
            });
    }

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategoriesId(e.target.value);
    };

    function LoadVideos(categoryId: string) {
        if (categoryId && categoryId !== '-1') {
            axios.get(`http://127.0.0.1:7000/category/${categoryId}`)
                .then(response => {
                    setVideos(response.data);
                })
                .catch(error => {
                    console.error("There was an error fetching the videos!", error);
                });
        } else if(categoriesId == "-1"){
            axios.get(`http://127.0.0.1:7000/get-videos`)
            .then(response => {
                setVideos(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the videos!", error);
            });
        }else{
            setVideos([])
        }
    }

    useEffect(() => {
        if (categoriesId) {
            LoadVideos(categoriesId);
        }
    }, [categoriesId]);

    
    useEffect(() => {
        VideoCat();
    }, []);

    return (
        <div>
            <header className="text-center fs-2 text-white fw-bold">Video Category </header>
            <div className="d-flex justify-content-between">
                <span className="fs-3 fw-bold text-white">[ {cookies['user-id']} ]</span>
                <button  onClick={handleSignout} className="btn btn-danger">Signout</button>
            </div>
            <nav className="text-center me-4 text-white">
                <Link to='/user-dashboard' className="ms-5 fs-4 fw-bold text-white text-decoration-none">Home</Link>
                <Link to='/video-category' className="ms-2 fs-4 fw-bold text-white text-decoration-none">Category</Link>
            </nav>

        <dl className="row">
        <dt className="col-4 fs-4 text-white">Select Category</dt>
            <dd className="col-8">
                <select name="CategoryId" className="form-control w-50 mt-2" onChange={handleCategoryChange}>
                    {
                        categories?.map(category => 
                            <option key={category.CategoryId} value={category.CategoryId}>{category.CategoryName}</option>
                        )
                    }
                </select>
            </dd>
        </dl>

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