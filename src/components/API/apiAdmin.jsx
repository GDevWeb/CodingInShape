export const BASE_URL = "http://localhost:4000";
export const USERS_API = `${BASE_URL}/api/admin/users`;
export const USER_API = (userId) => `${USERS_API}/${userId}`;
export const BAN_USER_API = (userId) => `${USERS_API}/ban/${userId}`;
export const UNBAN_USER_API = (userId) => `${USERS_API}/unban/${userId}`;
export const ADMIN_USER_API = (userId) => `${USERS_API}/admin/${userId}`;
export const UNADMIN_USER_API = (userId) => `${USERS_API}/unadmin/${userId}`;

/**📖Routes pour admin / users - Gestion de user 📖*/