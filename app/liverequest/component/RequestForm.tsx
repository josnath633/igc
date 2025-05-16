"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { Check } from "lucide-react";
import { RequestFormAction } from "../action/request";

const RequestForm = () => {
  const [liveSessionId, setLiveSessionId] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [requestDone, setRequestDone] = useState<boolean>(false);
  const [isUserApproved, setIsUserApproved] = useState<boolean>(false); // New state to track user approval

  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Récupère l’ID de session dans l’URL (ex: ?id=...)
  useEffect(() => {
    const urlId = searchParams.get("id");
    if (urlId) setLiveSessionId(urlId);
  }, [searchParams]);

  // Vérifie si l'utilisateur est approuvé dans la base de données
  useEffect(() => {
    const checkUserApproval = async () => {
      if (session?.user?.role === "client" && session?.user?.email) {
        const userEmail = session.user.email;
        const userName = session.user.name || userEmail; // Assuming name is the email if not provided.

        // Call an API or function to verify if the user is approved.
        // For the sake of the example, let's mock this request:
        const response = await fetch(`/api/check-user-approval?email=${userEmail}&name=${userEmail}`);
        const data = await response.json();

        if (data.isApproved) {
          setIsUserApproved(true); // Set user approval 
          router.push("/live");
        }
      }
    };

    checkUserApproval();
  }, [status, session]);

  // Si l’utilisateur est connecté et approuvé, envoie sa demande à la BDD
  useEffect(() => {
    const sendRequest = async () => {
      if (
        status === "authenticated" &&
        session?.user?.email &&
        liveSessionId &&
        !requestDone &&
        isUserApproved // Ensure user is approved before sending request
      ) {
        await RequestFormAction({
          email: session.user.email,
          liveSessionId,
        });
        setRequestDone(true);
        setIsSuccess(true);

        // Redirige après 2.5s
        setTimeout(() => {
          router.push(`/waiting?id=${liveSessionId}`);
        }, 2500);
      }
    };

    sendRequest();
  }, [status, session, liveSessionId, requestDone, isUserApproved, router]);

  // Connexion via Google
  const handleGoogleSignIn = async () => {
    if (!liveSessionId) {
      alert("ID de session live manquant dans l'URL.");
      return;
    }

    await signIn("google", {
      callbackUrl: `/liverequest?id=${liveSessionId}`, // Reviens ici après login pour lancer useEffect
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-white to-yellow-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {isSuccess ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-8 rounded-xl shadow-lg border border-green-200 text-center"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-green-600 mb-2">
              Connexion réussie!
            </h2>
            <p className="text-gray-600 mb-4">
              Vous allez être redirigé vers la page d'attente.
            </p>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2 }}
                className="h-full bg-green-500"
              />
            </div>
          </motion.div>
        ) : (
          <div className="bg-white p-8 rounded-xl shadow-lg border border-yellow-200 text-center">
            <h2 className="text-2xl font-bold text-black mb-6">Connexion</h2>
            <button
              onClick={handleGoogleSignIn}
              className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg w-full"
            >
              <FcGoogle size={24} className="bg-white rounded-full" />
              Se connecter avec Google
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default RequestForm;
