import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Show {
  id: number;
  showTime: string;
}

export default function Showtimes() {
  const { movieId, theaterId } = useParams();
  const [shows, setShows] = useState<Show[]>([]);
  const navigate = useNavigate();


  useEffect(() => {
    fetch(`http://localhost:8080/movies/${movieId}/theaters/${theaterId}/shows`,{
      headers:{
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    })
      .then((res) => res.json())
      .then((data) => setShows(data));
  }, [movieId, theaterId]);
  
  return (
    <div>
      <h2>Showtimes</h2>
      {shows.map((show) => (
        <button
          key={show.id}
          onClick={() => {
            navigate(`${show.id}/seats`)
          }}
        >
          {new Date(show.showTime).toLocaleString()}
        </button>
      ))}
    </div>
  );
}
