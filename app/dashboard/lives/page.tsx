"use client"

import { useState, useEffect } from "react"
import { Eye, Pencil, Trash2 } from "lucide-react"
import { deleteLive } from "./actions/deleteLive"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@radix-ui/react-separator"

interface Live {
  id: string
  title: string
  description?: string
  startTime: string
  endTime: string
  status: "PENDING" | "ONGOING" | "ENDED" | "CANCELED"
}

const AdminLivesTable = () => {
  const [lives, setLives] = useState<Live[]>([])

  useEffect(() => {
    // Exemple de récupération (remplacer par fetch réel)
    const fetchLives = async () => {
      const data: Live[] = await fetch("/api/lives").then((res) => res.json())
      console.log(data)
      setLives(data)
    }
    fetchLives()
  }, [])


  const handleDelete = async (id: string) => {
    if (confirm("Confirmer la suppression de ce live ?")) {
      try {
        // Appel de la server action pour supprimer le live
        const result = await deleteLive(id)
        if (result.success) {
          // Mise à jour de l'état local pour refléter la suppression
          setLives((prev) => prev.filter((live) => live.id !== id))
          alert("Live supprimé avec succès.")
        } else {
          alert(result.message || "Erreur inconnue.")
        }
      } catch (err) {
        console.error("Erreur lors de la suppression :", err)
        alert("Erreur lors de la suppression du live.")
      }
    }
  }

  const handleEdit = (id: string) => {
    alert(`Modifier le live : ${id}`)
    // ou router.push(`/admin/lives/edit/${id}`)
  }

  const handleView = (id: string) => {
    alert(`Détails du live : ${id}`)
    // ou router.push(`/admin/lives/${id}`)
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
                  <BreadcrumbLink href="/dashboard" className="text-yellow-600 font-medium">IGC</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block text-yellow-400" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-bold text-black">Lives</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>


        <div className="p-6 bg-white shadow-md rounded-lg border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4">Lives programmés</h2>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2">Titre</th>
                <th className="px-4 py-2">Début</th>
                <th className="px-4 py-2">Fin</th>
                <th className="px-4 py-2">Statut</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {lives.map((live) => (
                <tr key={live.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{live.title}</td>
                  <td className="px-4 py-2">{new Date(live.startTime).toLocaleString()}</td>
                  <td className="px-4 py-2">{new Date(live.endTime).toLocaleString()}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`text-xs px-2 py-1 rounded font-medium ${live.status === "ONGOING"
                          ? "bg-green-100 text-green-700"
                          : live.status === "ENDED"
                            ? "bg-gray-200 text-gray-700"
                            : live.status === "CANCELED"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {live.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => handleView(live.id)}
                      className="p-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEdit(live.id)}
                      className="p-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 rounded"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(live.id)}
                      className="p-1 bg-red-100 hover:bg-red-200 text-red-700 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default AdminLivesTable
