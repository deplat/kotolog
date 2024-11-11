import { auth } from '@/auth'
import { UserRole } from '@/types/UserRole' // Update path based on your actual auth function location

type CheckUserRoleResult = {
  allowed: boolean
  role: UserRole | null
}

export const checkUserRole = async (allowedRoles: UserRole[]): Promise<CheckUserRoleResult> => {
  const session = await auth()

  if (!session) {
    console.error('User is not authenticated.')
    return { allowed: false, role: null }
  }

  const userRole = session.user.role as UserRole

  if (!allowedRoles.includes(userRole)) {
    console.error(`User role ${userRole} is not authorized.`)
    return { allowed: false, role: userRole }
  }

  return { allowed: true, role: userRole }
}
