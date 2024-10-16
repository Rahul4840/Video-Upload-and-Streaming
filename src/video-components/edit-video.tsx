import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { EditContract } from "../contracts/EditContract";
import { CategoriesContract } from "../contracts/CategoriesContract";

export function EditVideo() {

    const [edit, setEdit] = useState<EditContract[]>([
    {
      VideoId: 0,
      Title: "",
      Url: "",
      Description: "",
      Likes: 0,
      Dislikes: 0,
      CategoryId: 0,
    },
  ]);

  const [categories, setCategories] = useState<CategoriesContract[]>([]);

  let params = useParams();
  let navigate = useNavigate(); 

  useEffect(() => {
    axios.get(`http://127.0.0.1:7000/get-video/${params.id}`).then((response) => {
      setEdit(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`http://127.0.0.1:7000/get-categories`).then((response) => {
      setCategories(response.data);
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      VideoId: edit[0].VideoId,
      Title: edit[0].Title,
      Url: edit[0].Url,
      Description: edit[0].Description,
      Likes: edit[0].Likes,
      Dislikes: edit[0].Dislikes,
      CategoryId: edit[0].CategoryId,
    },

    onSubmit: (edit) => {
      axios.put(`http://127.0.0.1:7000/edit-video/${params.id}`, edit)
        .then(() => {
          alert(`Video Edited Successfully.`);
          navigate("/admin-dashboard");
        });
    },
    enableReinitialize: true,
  });

  return (
    <div className="bg-light text-dark p-4">
      <h3>Edit Task</h3>
      <form onSubmit={formik.handleSubmit}>
        <dl>
          <dt className="col-3">Video Id</dt>
          <dd className="col-9"><input type="number" value={formik.values.VideoId} name="VideoId" className="form-control" onChange={formik.handleChange}/></dd>
          <dt className="col-3">Title</dt>
          <dd className="col-9"><input type="text" value={formik.values.Title} name="Title" className="form-control" onChange={formik.handleChange} /></dd>
          <dt className="col-3">Url</dt>
          <dd className="col-9"><input type="text" value={formik.values.Url} name="Url" className="form-control" onChange={formik.handleChange} /></dd>
          <dt className="col-3">Description</dt>
          <dd className="col-9">
            <textarea name="Description" value={formik.values.Description} rows={4} cols={40} className="form-control" onChange={formik.handleChange} ></textarea>
          </dd>
          <dt className="col-3">Likes</dt>
          <dd className="col-9"><input type="number" value={formik.values.Likes} name="Likes" className="form-control" onChange={formik.handleChange}/></dd>
          <dt className="col-3">Dislikes</dt>
          <dd className="col-9"><input type="number" value={formik.values.Dislikes} name="Dislikes" className="form-control" onChange={formik.handleChange} /></dd>
          <dt className="col-3">Select Category</dt>
          <dd className="col-9">
            <select name="CategoryId" value={formik.values.CategoryId} className="form-control" onChange={formik.handleChange}>
              {categories?.map((category) => (
                <option key={category.CategoryId} value={category.CategoryId}>
                  {category.CategoryName}
                </option>
              ))}
            </select>
          </dd>
        </dl>
        <button className="btn btn-success me-1">Save</button>
        <Link to="/admin-dashboard" className="btn btn-danger">Cancel</Link>
      </form>
    </div>
  );
}
