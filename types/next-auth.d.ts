import { AdapterUser as CoreAdapterUser } from '@auth/core/adapters'
import { UserRole } from '@prisma/client'

declare module '@auth/core/adapters' {
  interface AdapterUser extends CoreAdapterUser {
    role: UserRole
  }
}
