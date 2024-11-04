'use client'
import { signOut } from 'next-auth/react'

export function SignOutButtonClient() {
  return <button onClick={() => signOut()}>Sign Out</button>
}
