"use client";

import { useEffect, useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar"; // Import SidebarProvider
; // Assurez-vous que le chemin est correct
import { updateRequestStatusAction } from "./actions/updateRequestStatusAction"; // Importer la Server Action
import { getRequestsAction } from "./actions/getRequestsAction"; // Importer l'action pour récupérer les demandes
import { AppSidebar } from "@/components/app-sidebar";

// Définition des types pour les requêtes
interface Request {
  id: string;
  name: string;
  surname: string;
  functionInChurch: string;
  status: string;
  isLiveRequest?: boolean; // Rendre isLiveRequest optionnel
}

const AdminRequestsPage = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getRequestsAction(); // Appeler la fonction action pour récupérer les demandes
        if (Array.isArray(data)) {
          setRequests(data); // Données récupérées avec succès
        } else {
          setError("Invalid data format received.");
        }
      } catch (err) {
        setError("An error occurred while fetching the requests.");
        console.error(err); // Log l'erreur pour le débogage
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleStatusChange = async (requestId: string, status: string) => {
    try {
      // Appel de la Server Action pour mettre à jour le statut
      const updatedRequest = await updateRequestStatusAction(
        requestId,
        status as any
      );

      // Mise à jour optimiste de l'état local
      setRequests((prev) =>
        prev.map((request) =>
          request.id === requestId
            ? { ...request, status: updatedRequest.status }
            : request
        )
      );
    } catch (error) {
      setError("Error updating the request status.");
      console.error(error); // Log l'erreur pour le débogage
    }
  };

  if (loading) {
    return (
      <div className="flex  justify-center items-center h-screen w-screen">
        <div className="text-xl font-semibold text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600">
        <div className="text-xl font-semibold">{error}</div>
      </div>
    );
  }

  return (
    < >
      <div className="flex">
        {/* Sidebar component */}
        <AppSidebar className="" />

        <div className="p-6 md:p-8 max-w-7xl mx-auto w-full ">
          <h2 className="text-3xl font-bold mb-6 text-center">User Requests</h2>

          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-200 shadow-md rounded-lg">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Surname</th>
                  <th className="border px-4 py-2">Function</th>
                  <th className="border px-4 py-2">Status</th>
                  <th className="border px-4 py-2">Live Request</th>{" "}
                  {/* Nouveau champ */}
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="border text-center py-4">
                      No requests available.
                    </td>
                  </tr>
                ) : (
                  requests.map((request) => (
                    <tr key={request.id} className="hover:bg-gray-50">
                      <td className="border px-4 py-2">{request.name}</td>
                      <td className="border px-4 py-2">{request.surname}</td>
                      <td className="border px-4 py-2">
                        {request.functionInChurch}
                      </td>
                      <td className="border px-4 py-2">{request.status}</td>
                      <td className="border px-4 py-2">
                        {request.isLiveRequest ? "Yes" : "No"}
                      </td>{" "}
                      {/* Affichage de la demande de live */}
                      <td className="border px-4 py-2 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() =>
                              handleStatusChange(request.id, "APPROVED")
                            }
                            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200 text-xs sm:text-base"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() =>
                              handleStatusChange(request.id, "REJECTED")
                            }
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200 text-xs sm:text-base"
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminRequestsPage;
