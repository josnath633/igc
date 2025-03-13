// app/request-form/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RequestFormAction } from "./action/request";
 // Nous allons créer cette action plus bas

const RequestForm = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [functionInChurch, setFunctionInChurch] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation des champs du formulaire
    if (!name || !surname || !functionInChurch) {
      setError("Tous les champs sont requis.");
      return;
    }

    setIsSubmitting(true);
    setError(""); // Effacer les erreurs précédentes

    try {
      // Appel à l'action serveur pour envoyer la requête
      const response = await RequestFormAction({ name, surname, functionInChurch });

      if (response.success) {
        alert(response.message);
        router.push("/waiting"); // Redirection vers la page d'attente
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Formulaire de demande</h2>
        {error && <p className="text-red-600">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-600">Nom</label>
            <input
              id="name"
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="surname" className="block text-gray-600">Prénom</label>
            <input
              id="surname"
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="functionInChurch" className="block text-gray-600">Fonction dans l'église</label>
            <input
              id="functionInChurch"
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={functionInChurch}
              onChange={(e) => setFunctionInChurch(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enregistrement..." : "Enregistrer"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestForm;
