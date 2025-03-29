import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import Loader from "../common/loader";

interface Theater {
  id: number;
  name: string;
  location: string;
  imageUrl: string;
}

const TheaterList: React.FC = () => {
  const {movieId}=useParams();  
  const [theaters, setTheaters] = useState<Theater[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/movies/${movieId}/theaters`)
      .then((response) => {
        setTheaters(response.data);
        setLoading(false);
      })
      .catch((_error) => {
        setError("Failed to fetch theaters.");
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader/>;
  if (error) return <p className="text-danger text-center mt-4">{error}</p>;
  if (theaters.length==0) return <h2 className="text-danger text-center mt-4">🎬No Show Available......</h2>
  return (
    

    <div className="container">
      <h2 className="my-4 text-center">Available Theaters</h2>
      <div className="row">
        {theaters.map((theater) => (
          <div className="col-md-4 mb-4" key={theater.id}>
            <div className="card h-100 ">
              <img src={theater.imageUrl} className="card-img-top" alt={theater.name} />
              <div className="card-body">
                <h5 className="card-title">{theater.name}</h5>
                <p className="card-text">{theater.location}</p>
                <button className="btn1 w-100">Book Ticket</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TheaterList;
