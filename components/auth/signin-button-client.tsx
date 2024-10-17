'use client'
import { signIn } from 'next-auth/react'

export function SignInButtonClient() {
  return <button onClick={() => signIn()}>Sign In</button>
}
