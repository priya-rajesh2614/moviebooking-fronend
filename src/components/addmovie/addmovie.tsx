import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddMovie = () => {
  const [movie, setMovie] = useState({
    title: "",
    genre: "",
    language: "",
    duration: "",
    description: "",
    imageUrl: "",
  });
  const navigate = useNavigate(); 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await axios.post("http://localhost:8080/movies", movie);
    alert("Movie added!");
    navigate('/home')
  };

  return (
    <div className="card card-width mt-4">
      <h3>Add Movie</h3>
      <input className="form-control  my-2" name="title" placeholder="Title" onChange={handleChange} />
      <input className="form-control my-2" name="genre" placeholder="Genre" onChange={handleChange} />
      <input className="form-control my-2" name="language" placeholder="Language" onChange={handleChange} />
      <input className="form-control my-2" name="duration" placeholder="Duration (min)" onChange={handleChange} />
      <textarea className="form-control my-2" name="description" placeholder="Description" onChange={handleChange} />
      <input className="form-control my-2" name="imageUrl" placeholder="Image URL" onChange={handleChange} />
      <button className="btn1 mt-2" style={{width:"338px"}}  onClick={handleSubmit}>Add Movie</button>
    </div>
  );
};

export default AddMovie;
