'use client';

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OrganisationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/"); // Redirige si pas de session
    } else if (session.user.role === "CLIENT") {
      // ✅ Redirige automatiquement si l'utilisateur est CLIENT
      router.push("/waiting");
    }
  }, [session, status, router]);

  // Pendant le chargement ou redirection, ne rien afficher
  if (status === "loading" || !session) {
    return null;
  }

  return <>{children}</>;
}
