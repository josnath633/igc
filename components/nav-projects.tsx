"use client"

import type * as React from "react"
import Link from "next/link"
import { Plus } from "lucide-react"
import { motion } from "framer-motion"

import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

interface NavProjectsProps {
  projects: {
    name: string
    url: string
    icon: React.ElementType
  }[]
}

export function NavProjects({ projects }: NavProjectsProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-yellow-600 font-medium">Projets</SidebarGroupLabel>
      <SidebarGroupAction>
        <Plus className="h-4 w-4 text-yellow-600" />
      </SidebarGroupAction>
      <SidebarGroupContent>
        <SidebarMenu>
          {projects.map((project, index) => (
            <SidebarMenuItem key={index}>
              <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <SidebarMenuButton asChild tooltip={project.name}>
                  <Link href={project.url} className="group transition-all duration-300 ease-in-out">
                    <project.icon className="text-green-600 group-hover:text-yellow-600 transition-colors duration-300" />
                    <span>{project.name}</span>
                  </Link>
                </SidebarMenuButton>
              </motion.div>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
