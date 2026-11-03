import type User from "./User";

export default interface Authentication {
    accessToken : string,
    tokenType: string,
    expiresIn: 3600,
    user: User
}