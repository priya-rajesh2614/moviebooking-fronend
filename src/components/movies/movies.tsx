import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../common/loader";
import { useNavigate } from "react-router-dom";

interface Movie {
  id: number;
  title: string;
duration:number;
  genre: string;
  imageUrl: string;
}

const Movies: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); 
  
  useEffect(() => {
    axios
      .get("http://localhost:8080/movies")
      .then((response) => {
        setMovies(response.data);
        setLoading(false);
      })
      .catch(() => {  
        setError("Failed to fetch movies");
        setLoading(false);
      });
  }, []);
  

  const handleBook = (movieId: number) => {
    navigate(`/movies/${movieId}/theaters`)
  };
  

  return (
    <div className="container">
      <h2 className="my-4">Recommended Movies</h2>

      {loading && <Loader />}
      {error && <p className="text-danger">{error}</p>}

      {!loading && !error && (
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {movies.map((movie) => (
            <div key={movie.id} className="col">
              <div className="card">
                <img
                  src={movie.imageUrl}
                  className="card-img-top"
                  alt={movie.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{movie.title}</h5>
                  <p className="card-text">{movie.genre}</p>
                  <p className="card-text">Duration: {movie.duration} mins</p>
                  <button
                    className="btn1"
                    onClick={() => handleBook(movie.id)}
                  >
                    Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Movies;
