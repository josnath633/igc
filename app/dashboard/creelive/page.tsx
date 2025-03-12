"use client";
import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createLive } from "./action/createlive";

// Définition du type LiveSession
interface LiveSession {
  id: string;
  title: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  startTime: Date;
  endTime: Date;
  status: string;
}

export default function CreateLivePage() {
  const [liveSessions, setLiveSessions] = useState<LiveSession[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleCreateLive = async () => {
    try {
      if (!title || !startTime || !endTime) {
        alert("Veuillez remplir tous les champs !");
        return;
      }

      const newLive = await createLive({
        title,
        description: description || undefined,
        startTime: new Date(`2024-01-01T${startTime}:00`), // Ex : "14:00"
        endTime: new Date(`2024-01-01T${endTime}:00`),
      });

      setLiveSessions([...liveSessions, newLive]);
      setTitle("");
      setDescription("");
      setStartTime("");
      setEndTime("");
    } catch (error) {
      console.error("Erreur lors de la création du live", error);
    }
  };

  // Liste des heures possibles (exemple de 08h00 à 22h00)
  const availableTimes = Array.from({ length: 15 }, (_, i) => {
    const hour = (8 + i).toString().padStart(2, "0");
    return `${hour}:00`;
  });

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <div>
          <AppSidebar />
        </div>

        <div className="flex-1 flex items-center justify-center p-6">
          <SidebarInset className="w-full max-w-2xl">
            <header className="flex h-16 items-center gap-2 mb-6">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">IGC</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Create Live</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>

            {liveSessions.length > 0 ? (
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-semibold">Live Sessions</h2>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                  {liveSessions.map((live) => (
                    <div key={live.id} className="bg-muted/50 p-6 rounded-xl flex items-center justify-center text-lg font-semibold">
                      <h3>{live.title}</h3>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-black hover:bg-black text-white px-4 py-2 mt-4">Create Live</Button>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create a New Live</DialogTitle>
                  </DialogHeader>
                  <form
                    className="space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleCreateLive();
                    }}
                  >
                    <div className="flex flex-col">
                      <label htmlFor="title" className="font-medium">Title</label>
                      <Input id="title" placeholder="Enter live title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="description" className="font-medium">Description</label>
                      <Textarea id="description" placeholder="Enter live description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>

                    {/* Sélection de l'heure de début */}
                    <div className="flex flex-col">
                      <label className="font-medium">Start Time</label>
                      <Select value={startTime} onValueChange={setStartTime}>
                        <SelectTrigger className="p-2 border border-gray-300 rounded">
                          <SelectValue placeholder="Select start time" />
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

                    {/* Sélection de l'heure de fin */}
                    <div className="flex flex-col">
                      <label className="font-medium">End Time</label>
                      <Select value={endTime} onValueChange={setEndTime}>
                        <SelectTrigger className="p-2 border border-gray-300 rounded">
                          <SelectValue placeholder="Select end time" />
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

                    <DialogFooter>
                      <Button type="submit" className="bg-black hover:bg-black text-white px-4 py-2 mt-4">
                        Create Live
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            )}
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
