export const BASE_URL = "http://localhost:4000";
export const USERS_API = `${BASE_URL}/api/admin/users`;
export const USER_API = (userId) => `${USERS_API}/${userId}`;
export const BAN_USER_API = (userId) => `${USER_API(userId)}/ban`;
export const UNBAN_USER_API = (userId) => `${USER_API(userId)}/unban`;
export const UNADMIN_USER_API = (userId) => `${USER_API(userId)}/unadmin`;
