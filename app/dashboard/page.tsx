import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link"; // Import Link from Next.js

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">IGC</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>admin</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Link href="/dashboard/creelive">
              <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center text-lg font-semibold cursor-pointer hover:bg-muted/70">
                Créer un Live
              </div>
            </Link>
            <Link href="/dashboard/livedemande">
            <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center text-lg font-semibold cursor-pointer hover:bg-muted/70">
              Créer une Publication
            </div>
            </Link>
            <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center text-lg font-semibold cursor-pointer hover:bg-muted/70">
              Voir la Liste des Lives
            </div>
            <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center text-lg font-semibold cursor-pointer hover:bg-muted/70">
              Voir la Liste des Personnes en Live
            </div>
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
