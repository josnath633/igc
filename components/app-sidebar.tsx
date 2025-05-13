"use client"

import * as React from "react"
import { BookOpen, Frame, GalleryVerticalEnd, Map, PieChart, Settings2, Video, FileText, Users, Home, Calendar } from 'lucide-react'

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// Données combinées
const data = {
  user: {
    name: "admin",
    email: "admin@igc.org",
    avatar: "/avatars/admin.jpg",
  },
  teams: [
    {
      name: "IGC",
      logo: GalleryVerticalEnd,
      plan: "EGLISE",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
      isActive: true,
    },
    {
      title: "Créer un Live",
      url: "/dashboard/creelive",
      icon: Video,
    },
    {
      title: "Publications",
      url: "/dashboard/livedemande",
      icon: FileText,
      items: [
        {
          title: "Demandes",
          url: "/dashboard/livedemande",
        },
        {
          title: "Historique",
          url: "#",
        },
        {
          title: "Paramètres",
          url: "#",
        },
      ],
    },
    {
      title: "Calendrier",
      url: "/calendar",
      icon: Calendar,
    },
    {
      title: "Utilisateurs",
      url: "/users",
      icon: Users,
      items: [
        {
          title: "Liste",
          url: "#",
        },
        {
          title: "Rôles",
          url: "#",
        },
        {
          title: "Permissions",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Tutoriels",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Paramètres",
      url: "/settings",
      icon: Settings2,
    },
  ],
  projects: [
    {
      name: "Cultes",
      url: "#",
      icon: Frame,
    },
    {
      name: "Événements",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Missions",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser  />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
