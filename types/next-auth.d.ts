import {User} from "next-auth"
import type { AdapterUser as BaseAdapterUser } from "next-auth/adapters";


declare module "next-auth" {
    interface Session {
        user: User & {
            isAdmin: boolean;
        }
    }}


declare module "@auth/core/adapters" {
    interface AdapterUser extends BaseAdapterUser {
        isAdmin: boolean;
    }
}