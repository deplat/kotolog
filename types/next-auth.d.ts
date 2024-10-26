import { AdapterUser as CoreAdapterUser } from '@auth/core/adapters'
import { UserRole } from '@/types'

declare module '@auth/core/adapters' {
  interface AdapterUser extends CoreAdapterUser {
    role: UserRole
  }
}
