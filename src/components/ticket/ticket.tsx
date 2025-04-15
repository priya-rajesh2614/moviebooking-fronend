import { useLocation } from "react-router-dom";
import {QRCodeCanvas} from  "qrcode.react"



export default function Ticket(){

    const location=useLocation();
    const {seatNumbers,transactionId}=location.state|| {}; //,movieName,theaterName,showTime
    if (!transactionId) return <p>No booking found.</p>;

    const qrData={
        transactionId,
        seats:seatNumbers,
        // movie:movieName,
        // theater:theaterName,
        // showTime,
    };

    return(
        <div className="card" style={{textAlign:"center",fontFamily:"Arial",marginTop:"40px"}}>
            <h2>🎟️ Ticket Confirmed</h2>
            <p><strong>Transaction Id:</strong>{transactionId}</p>
            <p><strong>Seats:</strong>{seatNumbers.join(", ")}</p>
            {/* <p><strong>Movie:</strong>{movieName}</p>
            <p><strong>Theater:</strong>{theaterName}</p>
            <p><strong>Show Time:</strong>{showTime}</p> */}

            <div style={{marginTop:"20px"}}>
            <QRCodeCanvas value={JSON.stringify(qrData)} size={200}/>
            <p style={{marginTop:"10px"}}>Scan this QR at the theater</p>
            </div>
        </div>
    )

} 