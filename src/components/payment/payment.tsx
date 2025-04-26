import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";


const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedSeats, seatNumbers } = location.state || {};
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [isProcessing, setIsProcessing] = useState(false);

  if (!selectedSeats || selectedSeats.length === 0) {
    return <p>No seats selected. Please go back and select seats.</p>;
  }

  const totalPrice = selectedSeats.length * 150;

  const handlePayment = async () => {
    setIsProcessing(true);
    
       axios
       .post(" http://localhost:8080/api/payments/process",{
        userEmail: "test@example.com",
        paymentMethod: paymentMethod,
        amount: totalPrice,
        selectedSeats: selectedSeats,},{
          headers:{
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        })
        .then((response) => {
          
          alert(`✅ Payment Successful!\nTransaction ID: ${response.data.transactionId}`);
          navigate("/ticket", { state: { seatNumbers, transactionId: response.data.transactionId } });
        })
        .catch(() => {  
          alert("❌ Payment failed. Please try again.");
        });
      
  };

  return (
    <div
      className="payment-card"
      style={{
        padding: "30px",
        fontFamily: "Arial",
        maxWidth: "500px",
        margin: "40px auto",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        backgroundColor: "#fff"
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>💳 Payment</h2>

      <p><strong>Selected Seats:</strong> {seatNumbers.join(", ")}</p>
      <p><strong>Total Price:</strong> ₹{totalPrice}</p>

      <h3 style={{ marginTop: "30px" }}>Choose Payment Method</h3>
      <div style={{ marginTop: "10px" }}>
        {["Credit Card", "UPI", "Net Banking"].map((method) => (
          <label key={method} style={{ display: "block", margin: "8px 0" }}>
            <input
              type="radio"
              name="paymentMethod"
              value={method}
              checked={paymentMethod === method}
              onChange={() => setPaymentMethod(method)}
              style={{ marginRight: "10px" }}
            />
            {method}
          </label>
        ))}
      </div>

      <button
        onClick={handlePayment}
        disabled={isProcessing}
        
        style={{
          marginTop: "30px",
          width: "100%",
          padding: "12px",
          backgroundColor: "hwb(334 0% 66%)",
          color: "white",
          border: "none",
          fontWeight: "bold",
          borderRadius: "6px",
          cursor: isProcessing ? "not-allowed" : "pointer"
        }}
      >
        {isProcessing ? "Processing..." : `Proceed to Pay ₹${totalPrice}`}
      </button>
    </div>
  );
};

export default Payment;
