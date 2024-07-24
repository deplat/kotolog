import { AdapterUser as CoreAdapterUser } from "@auth/core/adapters";

declare module "@auth/core/adapters" {
    interface AdapterUser extends CoreAdapterUser {
        isAdmin: boolean;
    }
}

