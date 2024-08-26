"use client";

import React, { useState, useEffect } from "react";
import { Web3Service } from "@unlock-protocol/unlock-js";
import VoiceRecorder from "../components/VoiceRecorder";

const SubscriptionGate: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMember, setIsMember] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const lockAddress = "0xYourLockAddressHere"; // Replace with your lock address
  const userAddress = "0xUserWalletAddressHere"; // Replace with logic to get the user's wallet address
  
  useEffect(() => {
    const checkMembership = async () => {
           // @ts-ignore
      const web3Service = new Web3Service();
      try {
           // @ts-ignore
        const key = await web3Service.getKeyByLockForOwner({
          lockAddress,
          owner: userAddress,
        });

        const currentTime = Math.floor(Date.now() / 1000);
        if (key && key.expiration > currentTime) {
          setIsMember(true);
        } else {
          setIsMember(false);
        }
      } catch (error) {
        console.error("Error checking membership:", error);
        setErrorMessage("Error checking subscription status. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    checkMembership();
  }, [userAddress]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isMember) {
    return (
      <div>
        <p>You need an active subscription to access this feature.</p>
        <a
          href="https://app.unlock-protocol.com/checkout?id=d83d30ee-51c2-4b1b-86c5-0262633b579b"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 text-white px-4 py-2 rounded-full"
        >
          Get Subscription
        </a>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </div>
    );
  }

  return <VoiceRecorder />;
};

export default SubscriptionGate;
