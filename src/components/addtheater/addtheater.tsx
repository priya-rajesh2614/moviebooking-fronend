import { useState } from "react";
import axios from "axios";

const AddTheater = () => {
  const [theater, setTheater] = useState({
    name: "",
    location: "",
    image_url: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheater({ ...theater, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await axios.post("http://localhost:8080/api/admin/theaters", theater);
    alert("Theater added!");
  };

  return (
    <div className="card mt-4">
      <h3>Add Theater</h3>
      <input className="form-control my-2" name="name" placeholder="Name" onChange={handleChange} />
      <input className="form-control my-2" name="location" placeholder="Location" onChange={handleChange} />
      <input className="form-control my-2" name="image_url" placeholder="Image URL" onChange={handleChange} />
      <button className="btn1 mt-2" style={{width:"200px"}} onClick={handleSubmit}>Add Theater</button>
    </div>
  );
};

export default AddTheater;
