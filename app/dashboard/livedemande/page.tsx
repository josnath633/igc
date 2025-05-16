"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { updateRequestStatusAction } from "./actions/updateRequestStatusAction"
import { getRequestsAction } from "./actions/getRequestsAction"
import { Check, X, AlertCircle, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

// Définition des types pour les requêtes
interface Request {
  id: string
  name: string
  surname: string
  functionInChurch: string
  status: string
  isLiveRequest?: boolean
}

const AdminRequestsPage = () => {
  const [requests, setRequests] = useState<Request[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getRequestsAction()
        if (Array.isArray(data)) {
          setRequests(data)
        } else {
          setError("Format de données invalide.")
        }
      } catch (err) {
        setError("Une erreur s'est produite lors de la récupération des demandes.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchRequests()
  }, [])

  const handleStatusChange = async (requestId: string, status: string) => {
    try {
      const updatedRequest = await updateRequestStatusAction(requestId, status as any)
      setRequests((prev) =>
        prev.map((request) =>
          request.id === requestId ? { ...request, status: updatedRequest.status } : request,
        ),
      )
    } catch (error) {
      setError("Erreur lors de la mise à jour du statut de la demande.")
      console.error(error)
    }
  }

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      searchTerm === "" ||
      `${request.name} ${request.surname}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.functionInChurch.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === null || request.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-screen bg-gradient-to-b from-white to-yellow-50">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-yellow-500 border-t-red-600 rounded-full animate-spin mb-4"></div>
          <div className="text-xl font-semibold text-gray-700">Chargement...</div>
        </div>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="w-full">
        <header className="flex h-16 items-center gap-2 border-b border-yellow-200 bg-gradient-to-r from-yellow-50 to-white">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1 text-yellow-600 hover:text-red-600 transition-colors duration-300" />
            <Separator orientation="vertical" className="mr-2 h-4 bg-yellow-300" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard" className="text-yellow-600 font-medium">
                    IGC
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block text-yellow-400" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-bold text-black">Demandes</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="max-w-7xl mx-auto p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-yellow-200"
          >
            <h2 className="text-2xl font-bold mb-6 text-black">Demandes des Utilisateurs</h2>

            {error && (
              <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-lg flex items-center text-red-700">
                <AlertCircle className="mr-2" /> {error}
              </div>
            )}

            <div className="mb-6 flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Rechercher par nom ou fonction..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400"
                />
              </div>

              <div className="flex gap-2">
                {["Tous", "PENDING", "APPROVED", "REJECTED"].map((status, index) => {
                  const value = status === "Tous" ? null : status
                  const labelMap: Record<string, string> = {
                    Tous: "Tous",
                    PENDING: "En attente",
                    APPROVED: "Approuvé",
                    REJECTED: "Rejeté",
                  }
                  return (
                    <button
                      key={index}
                      onClick={() => setStatusFilter(value)}
                      className={`px-4 py-2 rounded-md transition-colors ${
                        statusFilter === value
                          ? value === "APPROVED"
                            ? "bg-green-500 text-white"
                            : value === "REJECTED"
                              ? "bg-red-500 text-white"
                              : value === "PENDING"
                                ? "bg-yellow-500 text-white"
                                : "bg-black text-white"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      }`}
                    >
                      {labelMap[status]}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="overflow-x-auto">
              {filteredRequests.length === 0 ? (
                <div className="text-center py-10 text-gray-500">Aucune demande trouvée.</div>
              ) : (
                <motion.table
                  className="w-full border-collapse"
                  variants={container}
                  initial="hidden"
                  animate="show"
                >
                  <thead>
                    <tr className="bg-yellow-50 text-left">
                      <th className="px-4 py-3 text-yellow-700 font-semibold rounded-tl-lg">Nom</th>
                      <th className="px-4 py-3 text-yellow-700 font-semibold">Prénom</th>
                      <th className="px-4 py-3 text-yellow-700 font-semibold">Fonction</th>
                      <th className="px-4 py-3 text-yellow-700 font-semibold">Statut</th>
                      <th className="px-4 py-3 text-yellow-700 font-semibold">Type</th>
                      <th className="px-4 py-3 text-yellow-700 font-semibold rounded-tr-lg">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRequests.map((request) => (
                      <motion.tr
                        key={request.id}
                        className="border-b border-yellow-100 hover:bg-yellow-50 transition-colors"
                        variants={item}
                      >
                        <td className="px-4 py-3 flex items-center gap-2">
                          {request.status === "APPROVED" && <Check className="text-green-600 w-4 h-4" />}
                          {request.status === "REJECTED" && <X className="text-red-600 w-4 h-4" />}
                          {request.name}
                        </td>
                        <td className="px-4 py-3">{request.surname}</td>
                        <td className="px-4 py-3">{request.functionInChurch}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              request.status === "APPROVED"
                                ? "bg-green-100 text-green-800"
                                : request.status === "REJECTED"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {request.status === "APPROVED"
                              ? "Approuvé"
                              : request.status === "REJECTED"
                                ? "Rejeté"
                                : "En attente"}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {request.isLiveRequest ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              Live
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              Standard
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2 justify-center">
                            <motion.button
                              whileHover={{ scale: request.status !== "APPROVED" ? 1.05 : 1 }}
                              whileTap={{ scale: request.status !== "APPROVED" ? 0.95 : 1 }}
                              disabled={request.status === "APPROVED"}
                              onClick={() => handleStatusChange(request.id, "APPROVED")}
                              className={`px-3 py-1.5 rounded-md flex items-center transition-all duration-300 ${
                                request.status === "APPROVED"
                                  ? "bg-green-200 text-white cursor-not-allowed"
                                  : "bg-gradient-to-r from-green-600 to-green-500 text-white hover:from-green-700 hover:to-green-600"
                              }`}
                            >
                              <Check className="mr-1 h-4 w-4" /> Approuver
                            </motion.button>

                            <motion.button
                              whileHover={{ scale: request.status !== "REJECTED" ? 1.05 : 1 }}
                              whileTap={{ scale: request.status !== "REJECTED" ? 0.95 : 1 }}
                              disabled={request.status === "REJECTED"}
                              onClick={() => handleStatusChange(request.id, "REJECTED")}
                              className={`px-3 py-1.5 rounded-md flex items-center transition-all duration-300 ${
                                request.status === "REJECTED"
                                  ? "bg-red-200 text-white cursor-not-allowed"
                                  : "bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-700 hover:to-red-600"
                              }`}
                            >
                              <X className="mr-1 h-4 w-4" /> Rejeter
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </motion.table>
              )}
            </div>
          </motion.div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default AdminRequestsPage
