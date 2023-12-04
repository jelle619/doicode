'use client';
import { useSession, signIn, signOut } from "next-auth/react"

export default function Options() {
  const { data: session, status } = useSession()
  if (status === "loading") {
    return <span>Laden...</span>
  } else if (status === "unauthenticated") {
    return <a onClick={() => signIn()}>Inloggen</a>
  } else if (status === "authenticated") {
    return (
      <>
      <a onClick={() => signOut()}>Bekijk Repositories</a>
      {session && <small>Je bent op dit moment ingelogd als {session && session?.user?.name}. <a href="/api/auth/signout">Uitloggen?</a></small>}
      </>
    )
  } else {
    return <span>Er is een fout opgetreden. Probeer het later opnieuw.</span>
  }
}