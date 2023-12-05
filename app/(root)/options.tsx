'use client';
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link";

export default function Options() {
  const { data: session, status } = useSession()
  if (status === "loading") {
    return <span>Laden...</span>
  } else if (status === "unauthenticated") {
    return <a onClick={() => signIn()}>Inloggen met GitHub</a>
  } else if (status === "authenticated") {
    return (
      <>
      <Link href="/repo/list">Bekijk Repositories</Link>
      {session && <small>Je bent op dit moment ingelogd als {session && session?.user?.name}. <a onClick={() => signOut()}>Uitloggen?</a></small>}
      </>
    )
  } else {
    return <span>Er is een fout opgetreden. Probeer het later opnieuw.</span>
  }
}