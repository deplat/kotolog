import { AdapterUser as CoreAdapterUser } from "@auth/core/adapters";

declare module "next-auth/adapters" {
    interface AdapterUser extends CoreAdapterUser {
        isAdmin: boolean;
    }
}

