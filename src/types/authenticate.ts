import { UserType } from "./user";

export type AuthenticateType = UserType & { token: string };
