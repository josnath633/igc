"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { AppSidebar } from "@/components/app-sidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, Video, Check } from 'lucide-react'
import { createLive } from "./action/createlive"

// Définition du type LiveSession
interface LiveSession {
  id: string
  title: string
  description: string | null
  createdAt: Date
  updatedAt: Date
  startTime: Date
  endTime: Date
  status: string
}

export default function CreateLivePage() {
  const [liveSessions, setLiveSessions] = useState<LiveSession[]>([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  const handleCreateLive = async () => {
    try {
      if (!title || !startTime || !endTime) {
        alert("Veuillez remplir tous les champs !")
        return
      }

      const newLive = await createLive({
        title,
        description: description || undefined,
        startTime: new Date(`2024-01-01T${startTime}:00`),
        endTime: new Date(`2024-01-01T${endTime}:00`),
      })

      setLiveSessions([...liveSessions, newLive])
      setTitle("")
      setDescription("")
      setStartTime("")
      setEndTime("")
      setIsSuccess(true)
      
      setTimeout(() => setIsSuccess(false), 3000)
    } catch (error) {
      console.error("Erreur lors de la création du live", error)
    }
  }

  const availableTimes = Array.from({ length: 15 }, (_, i) => {
    const hour = (8 + i).toString().padStart(2, "0")
    return `${hour}:00`
  })

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
                    <BreadcrumbPage className="font-bold text-black">Créer un Live</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>

          <div className="max-w-4xl mx-auto p-6">
            {isSuccess && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg flex items-center text-green-700"
              >
                <Check className="mr-2" /> Live créé avec succès!
              </motion.div>
            )}
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-yellow-200"
            >
              <h2 className="text-2xl font-bold mb-6 text-black">Créer un Nouveau Live</h2>
              
              {liveSessions.length > 0 ? (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-black">Sessions Live Programmées</h3>
                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                    {liveSessions.map((live) => (
                      <motion.div 
                        key={live.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-gradient-to-r from-red-600 to-red-500 p-6 rounded-xl text-white shadow-md"
                      >
                        <h3 className="font-bold text-lg mb-2">{live.title}</h3>
                        <div className="flex items-center text-sm mb-1">
                          <Clock className="mr-2 h-4 w-4" />
                          {new Date(live.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - 
                          {new Date(live.endTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </div>
                        {live.description && <p className="text-sm mt-2 text-white/80">{live.description}</p>}
                      </motion.div>
                    ))}
                  </div>
                  
                  <Button 
                    onClick={() => setLiveSessions([])} 
                    className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black"
                  >
                    Créer un autre Live
                  </Button>
                </div>
              ) : (
                <form
                  className="space-y-6"
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleCreateLive()
                  }}
                >
                  <div className="space-y-2">
                    <label htmlFor="title" className="font-medium text-gray-700">Titre du Live</label>
                    <Input 
                      id="title" 
                      placeholder="Entrez le titre du live" 
                      value={title} 
                      onChange={(e) => setTitle(e.target.value)}
                      className="border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="description" className="font-medium text-gray-700">Description</label>
                    <Textarea 
                      id="description" 
                      placeholder="Entrez la description du live" 
                      value={description} 
                      onChange={(e) => setDescription(e.target.value)}
                      className="border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400 min-h-[100px]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="font-medium text-gray-700">Heure de début</label>
                      <Select value={startTime} onValueChange={setStartTime}>
                        <SelectTrigger className="border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400">
                          <SelectValue placeholder="Sélectionnez l'heure de début" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableTimes.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="font-medium text-gray-700">Heure de fin</label>
                      <Select value={endTime} onValueChange={setEndTime}>
                        <SelectTrigger className="border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400">
                          <SelectValue placeholder="Sélectionnez l'heure de fin" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableTimes.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Video className="h-5 w-5" />
                    Créer le Live
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        </SidebarInset>
    </SidebarProvider>
  )
}
