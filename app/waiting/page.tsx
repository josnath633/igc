// app/WaitingPage.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getRequestStatus } from "./action/requestStatusAction";
 // Importez l'action serveur

const WaitingPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const name = localStorage.getItem("userName"); // Récupère le nom de l'utilisateur depuis localStorage
    if (name) {
      setUserName(name);
    } else {
      setError("User not found in localStorage.");
    }
  }, []);

  useEffect(() => {
    const checkRequestStatus = async () => {
      if (userName) {
        try {
          const userStatus = await getRequestStatus(userName); // Utilisation de la Server Action

          if (userStatus === "APPROVED") {
            router.push("/live"); // Redirige vers la page live si la demande est approuvée
          } else if (userStatus === "REJECTED") {
            setError("Your request has been rejected.");
          } else {
            setStatus("PENDING"); // Si la demande est en attente
          }
        } catch (err) {
          setError("An error occurred while checking the request status.");
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      }
    };

    checkRequestStatus();
  }, [userName, router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  if (status === "PENDING") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg">Your request is still pending. Please wait...</p>
      </div>
    );
  }

  return null;
};

export default WaitingPage;
