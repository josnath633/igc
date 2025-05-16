"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { RequestFormAction } from "../action/request";
import { User, Briefcase, Check } from "lucide-react";

const RequestForm = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [functionInChurch, setFunctionInChurch] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [liveSessionId, setLiveSessionId] = useState("");  // Ajoutez l'ID de session live ici
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = window.location.href;
    const match = url.match(/id=([0-9a-fA-F-]{36})/);
    if (match && match[1]) {
      setLiveSessionId(match[1]);
    }
  }, []);
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !functionInChurch || !liveSessionId) {
      setError("Tous les champs sont requis.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await RequestFormAction({ name,functionInChurch, liveSessionId });

      if (response.success) {
        setIsSuccess(true);
        localStorage.setItem("userName", name);

        setTimeout(() => {
          router.push("/waiting");
        }, 2000);
      } else {
        setError(response.message || "Une erreur est survenue.");
      }
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
      setError("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
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
            <h2 className="text-2xl font-bold text-green-600 mb-2">Demande Envoyée!</h2>
            <p className="text-gray-600 mb-4">
              Votre demande a été soumise avec succès. Vous allez être redirigé vers la page d'attente.
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
          <div className="bg-white p-8 rounded-xl shadow-lg border border-yellow-200">
            <h2 className="text-2xl font-bold text-center text-black mb-6">Formulaire de Demande</h2>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nom
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full p-2 border border-yellow-200 rounded-lg"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Entrez votre nom"
                />
              </div>

              
              <div className="space-y-2">
                <label htmlFor="functionInChurch" className="block text-sm font-medium text-gray-700">
                   l'église
                </label>
                <input
                  id="functionInChurch"
                  type="text"
                  className="w-full p-2 border border-yellow-200 rounded-lg"
                  value={functionInChurch}
                  onChange={(e) => setFunctionInChurch(e.target.value)}
                  placeholder="Entrez votre fonction"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 text-white py-3 rounded-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Traitement en cours..." : "Envoyer la demande"}
              </button>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default RequestForm;
