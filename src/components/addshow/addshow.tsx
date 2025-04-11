import { useEffect, useState } from "react";
import axios from "axios";

const AddShow = () => {
  const [show, setShow] = useState({ movieId: "", theaterId: "", showTime: "" });
  const [movies, setMovies] = useState([]);
  const [theaters, setTheaters] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/movies",{
      headers:{
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    }).then(res => setMovies(res.data));
    axios.get("http://localhost:8080/theaters",{
      headers:{
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    }).then(res => setTheaters(res.data));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setShow({ ...show, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await axios.post(`http://localhost:8080/movies/${show.movieId}/theaters/${show.theaterId}/shows`, show,{
      headers:{
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    });
    alert("Show added!");
    
  };

  return (
    <div className="card mt-4">
      <h3>Add Show</h3>
      <select className="form-select my-2" name="movieId" onChange={handleChange}>
        <option value="">Select Movie</option>
        {movies.map((m: any) => <option key={m.id} value={m.id}>{m.title}</option>)}
      </select>
      <select className="form-select my-2" name="theaterId" onChange={handleChange}>
        <option value="">Select Theater</option>
        {theaters.map((t: any) => <option key={t.id} value={t.id}>{t.name}</option>)}
      </select>
      <input className="form-control my-2" name="showTime" type="datetime-local" onChange={handleChange} />
      <button className="btn1  mt-2" style={{width:"200px"}}  onClick={handleSubmit}>Add Show</button>
    </div>
  );
};

export default AddShow;
