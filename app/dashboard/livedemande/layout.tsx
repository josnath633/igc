import { auth } from "@/auth"
import { SidebarProvider } from "@/components/ui/sidebar"
import { redirect } from "next/navigation"
import { AppSidebar } from "../../dashboardadmin/component/appside"


// The main layout component that includes the sidebar logic and authentication check
export default async function OrganisationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

//   // Check if the user is an ADMIN
//   if (!session?.user || session.user.role !== "ADMIN") {
//     redirect("/connexion") // Redirect to the login page if the user is not an admin
//   }

//   // Pass ownerId as a prop to children
//   const ownerId = session.user.id

  return (
    <main>
        <SidebarProvider className="bg-white">

      <AppSidebar />
      {/* Pass ownerId as a prop to children */}
      <div className="bg-transparent">
      {children}
      </div>
      </SidebarProvider>
    </main>
  )
}
