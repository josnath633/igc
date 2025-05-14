"use client"

import * as React from "react"
import { Check, ChevronsUpDown, PlusCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"

type Team = {
  name: string
  logo: React.ElementType
  plan: string
}

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface TeamSwitcherProps extends PopoverTriggerProps {
  teams: Team[]
}

export function TeamSwitcher({ teams, className }: TeamSwitcherProps) {
  const [open, setOpen] = React.useState(false)
  const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false)
  const [selectedTeam, setSelectedTeam] = React.useState<Team>(teams[0])

  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <SidebarMenu>
          <SidebarMenuItem>
            <PopoverTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-10 items-center justify-center rounded-full bg-gradient-to-r from-yellow-500 to-yellow-300 text-black">
                  <selectedTeam.logo className="size-5" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-bold text-lg">{selectedTeam.name}</span>
                  <span className="text-sm opacity-70">{selectedTeam.plan}</span>
                </div>
                <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
              </SidebarMenuButton>
            </PopoverTrigger>
          </SidebarMenuItem>
        </SidebarMenu>
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Rechercher une équipe..." />
              <CommandEmpty>Aucune équipe trouvée.</CommandEmpty>
              <CommandGroup heading="Équipes">
                {teams.map((team) => (
                  <CommandItem
                    key={team.name}
                    onSelect={() => {
                      setSelectedTeam(team)
                      setOpen(false)
                    }}
                    className="text-sm"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-yellow-500 to-yellow-300 text-black mr-2">
                      <team.logo className="h-4 w-4" />
                    </div>
                    <span>{team.name}</span>
                    <Check
                      className={cn("ml-auto h-4 w-4", selectedTeam.name === team.name ? "opacity-100" : "opacity-0")}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false)
                      setShowNewTeamDialog(true)
                    }}
                  >
                    <PlusCircle className="mr-2 h-5 w-5 text-red-600" />
                    Créer une équipe
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Créer une équipe</DialogTitle>
          <DialogDescription>Ajoutez une nouvelle équipe pour collaborer avec d'autres membres.</DialogDescription>
        </DialogHeader>
        <div>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom de l'équipe</Label>
              <Input id="name" placeholder="Acme Inc." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="plan">Plan</Label>
              <select
                id="plan"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="free">Gratuit</option>
                <option value="pro">Pro</option>
              </select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowNewTeamDialog(false)}>
            Annuler
          </Button>
          <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={() => setShowNewTeamDialog(false)}>
            Continuer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
