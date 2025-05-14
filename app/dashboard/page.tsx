"use client"

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
import Link from "next/link"
import { Video, FileText, List, Users } from "lucide-react"

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } },
}

export default function Page() {
  const menuItems = [
    {
      title: "Créer un Live",
      icon: <Video className="size-8 mb-2" />,
      href: "/dashboard/creelive",
      color: "from-red-600 to-red-500",
    },
    {
      title: "liste des demandes",
      icon: <FileText className="size-8 mb-2" />,
      href: "/dashboard/livedemande",
      color: "from-yellow-500 to-yellow-400",
    },
    {
      title: "Liste des Lives",
      icon: <List className="size-8 mb-2" />,
      href: "/dashboard/lives",
      color: "from-green-600 to-green-500",
    },
    {
      title: "Personnes en Live",
      icon: <Users className="size-8 mb-2" />,
      href: "/dashboard/users-live",
      color: "from-black to-gray-800",
    },
  ]

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-yellow-200 bg-gradient-to-r from-yellow-50 to-white transition-all duration-300 ease-linear">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1 text-yellow-600 hover:text-red-600 transition-colors duration-300" />
            <Separator orientation="vertical" className="mr-2 h-4 bg-yellow-300" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#" className="text-yellow-600 font-medium">
                    IGC
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block text-yellow-400" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-bold text-black">Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-6 bg-gradient-to-b from-white to-yellow-50">
          <motion.div
            className="grid auto-rows-min gap-6 md:grid-cols-2 lg:grid-cols-4"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {menuItems.map((item, index) => (
              <motion.div key={index} >
                <Link href={item.href}>
                  <div
                    className={`aspect-video rounded-xl bg-gradient-to-br ${item.color} text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center text-lg font-semibold cursor-pointer p-4 text-center`}
                  >
                    {item.icon}
                    {item.title}
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="flex-1 rounded-xl bg-white shadow-md p-6 border border-yellow-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-black">Bienvenue sur le Dashboard IGC</h2>
            <p className="text-gray-700">
              Utilisez les cartes ci-dessus pour naviguer vers les différentes fonctionnalités de l'application. Vous
              pouvez créer des lives, gérer les publications et voir les utilisateurs connectés.
            </p>
          </motion.div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
