"use client";
import React, { useState, useEffect } from "react";
import VoiceRecorder from "../../components/VoiceRecorder";

export default function Home() {
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    // Assuming Unlock Protocol will call a function or redirect upon payment completion
    // You can listen for a message or a URL parameter change indicating payment success
      // @ts-ignore
    const handlePaymentSuccess = (event) => {
      // Check if the event or URL indicates payment success

      if (event.data === "payment-success") {
        setIsPaid(true);
      }
    };

    window.addEventListener("message", handlePaymentSuccess);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("message", handlePaymentSuccess);
    };
  }, []);

  return (
    <div>
      <div
        style={{
          padding: "20px",
          backgroundColor: "#000000",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        {!isPaid ? (
          <iframe
            src="https://app.unlock-protocol.com/checkout?id=d83d30ee-51c2-4b1b-86c5-0262633b579b"
            style={{
              width: "100%",
              height: "600px",
              border: "none",
              borderRadius: "10px",
            }}
          ></iframe>
        ) : (
          <VoiceRecorder />
        )}
      </div>
    </div>
  );
}
