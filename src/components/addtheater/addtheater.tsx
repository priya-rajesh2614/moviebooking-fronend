import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddTheater = () => {
  const [theater, setTheater] = useState({
    name: "",
    location: "",
    image_url: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheater({ ...theater, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate(); 
  const handleSubmit = async () => {
    await axios.post("http://localhost:8080/api/admin/theaters", theater);
    alert("Theater added!");
    navigate('/home')
  };

  return (
    <div className="card1 card-width mt-4">
      <h3>Add Theater</h3>
      <input className="form-control my-2" name="name" placeholder="Name" onChange={handleChange} />
      <input className="form-control my-2" name="location" placeholder="Location" onChange={handleChange} />
      <input className="form-control my-2" name="image_url" placeholder="Image URL" onChange={handleChange} />
      <button className="btn1 mt-2" style={{width:"338px"}} onClick={handleSubmit}>Add Theater</button>
    </div>
  );
};

export default AddTheater;
