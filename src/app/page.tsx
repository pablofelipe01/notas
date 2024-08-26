"use client";
import React, { useState, useEffect } from "react";
import VoiceRecorder from "../../components/VoiceRecorder";

export default function Home() {
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    // Check if payment was previously completed
    const paymentStatus = localStorage.getItem("isPaid");
    if (paymentStatus === "true") {
      setIsPaid(true);
    } else {
      // Check for payment success parameter in URL
      const urlParams = new URLSearchParams(window.location.search);
      const paymentSuccess = urlParams.get("paymentSuccess");

      if (paymentSuccess === "true") {
        handlePaymentSuccess();
      } else {
        // Redirect to Unlock Protocol checkout if not paid
        redirectToCheckout();
      }
    }
  }, []);

  const handlePaymentSuccess = () => {
    // Mark payment as complete
    localStorage.setItem("isPaid", "true");
    setIsPaid(true);
  };

  const redirectToCheckout = () => {
    const unlockConfig = {
      icon: "https://storage.unlock-protocol.com/0ee52c23-2b6a-4026-a1b8-99eaaf9df617",
      locks: {
        "0x417d548d52c697219f72f040a5044e1a120fabbd": {
          name: "Notes IA",
          order: 0,
          network: 137,
        },
      },
      title: "Notas AI",
      referrer: "0x497c6e35629f25474D1243Ff362e0519703F5552",
      skipSelect: false,
      hideSoldOut: false,
      pessimistic: false,
      redirectUri: "https://notas-one.vercel.app/?paymentSuccess=true",
      skipRecipient: false,
      endingCallToAction: "Go to Notas AI",
      persistentCheckout: true,
    };

    const unlockUrl = `https://app.unlock-protocol.com/checkout?config=${encodeURIComponent(
      JSON.stringify(unlockConfig)
    )}`;
    window.location.href = unlockUrl;
  };

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
        {isPaid ? (
          <VoiceRecorder />
        ) : (
          <p>Redirecting to payment...</p>
        )}
      </div>
    </div>
  );
}
