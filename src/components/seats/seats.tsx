import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../common/loader";

interface Seat {
  id: number;
  seatNumber: string;
  isBooked: boolean;
}

const Seats = () => {
  const { showId, movieId, theaterId } = useParams();
  const navigate = useNavigate();
  const [seats, setSeats] = useState<Seat[]>([]);
  const [seatNumbers,setSeatNumbers]=useState<String[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  console.log('selectedSeats',selectedSeats)


  useEffect(() => {
    axios
      .get(`http://localhost:8080/movies/${movieId}/theaters/${theaterId}/shows/${showId}/seats`,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      })
      .then((response) => {
        setSeats(response.data);
        setLoading(false);
      })
      .catch(() => {  
        setError("Failed to fetch movies");
        setLoading(false);
      });
  }, [showId]);
  
  

  if (loading) return <Loader />;

  const toggleSeatSelection = (seatId: number,seatValue: string) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
      
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
    
    if (seatNumbers.includes(seatValue)){
      setSeatNumbers(seatNumbers.filter((seatNumber)=>seatNumber!==seatValue));
    }else{
    
    setSeatNumbers([...seatNumbers,seatValue]);
    }
  };

  console.log('seatNumber',seatNumbers)


  const proceedToPayment = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }
    navigate(`/payment`, { state: { selectedSeats ,seatNumbers} });
  };

  return (
    <div>
      <h2>Available Seats for Show {showId}</h2>
      {error && <p className="text-danger">{error}</p>}

      <div style={{ display: "flex", flexWrap: "wrap", width: "350px" }}>
        {seats.map((seat) => (
          <button
            key={seat.id}
            className="seat-button  m-1"
            style={{
              backgroundColor: seat.isBooked
                ? "silver"
                : selectedSeats.includes(seat.id)
                ? "blue"
                : "green",
              color: "white",
              cursor: seat.isBooked ? "not-allowed" : "pointer",
              borderRadius: "5px",
              padding: "10px",
              width:'42px'
            }}
            onClick={() => toggleSeatSelection(seat.id,seat.seatNumber)}
          >
            {seat.seatNumber}
          </button>
        ))}
      </div>
      <button onClick={proceedToPayment} disabled={selectedSeats.length === 0} className="my-3">
        Proceed to Payment
      </button>
    </div>
  );
};

export default Seats;
