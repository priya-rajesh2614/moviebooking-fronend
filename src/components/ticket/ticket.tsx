import { useLocation } from "react-router-dom";
import {QRCodeCanvas} from  "qrcode.react"



export default function Ticket(){

    const location=useLocation();
    const {seatNumbers,transactionId}=location.state|| {};
    if (!transactionId) return <p>No booking found.</p>;

    const qrData={
        transactionId,
        seats:seatNumbers,
       
    };

    return(
        <div className="card2" style={{textAlign:"center",fontFamily:"Arial",marginTop:"40px"}}>
            <h2>🎟️ Ticket Confirmed</h2>
            <p><strong>Transaction Id:</strong>{transactionId}</p>
            <p><strong>Seats:</strong>{seatNumbers.join(", ")}</p>
          

            <div style={{marginTop:"20px"}}>
            <QRCodeCanvas value={JSON.stringify(qrData)} size={200}/>
            <p style={{marginTop:"10px"}}>Scan this QR at the theater</p>
            </div>
        </div>
    )

} 