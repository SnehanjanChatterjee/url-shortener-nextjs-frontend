// API Constants
const BACKEND_ENDPOINT: string  = process.env.NEXT_PUBLIC_BACKEND_CLOUD_ENDPOINT ?? "http://localhost:8080";
const BACKEND_REST_PATH: string  = process.env.NEXT_PUBLIC_BACKEND_REST_PATH ?? "";
const URL_SHORTENER_BASE_ENDPOINT: string = BACKEND_ENDPOINT.concat(BACKEND_REST_PATH);
export const URL_SHORTENER_GENERATE_ENDPOINT: string = URL_SHORTENER_BASE_ENDPOINT.concat('/url/generate');
export const URL_SHORTENER_GET_ALL_ENDPOINT: string = URL_SHORTENER_BASE_ENDPOINT.concat('/url');
export const URL_SHORTENER_DELETE_ALL_ENDPOINT: string = URL_SHORTENER_BASE_ENDPOINT.concat('/url');
export const URL_SHORTENER_USER_REGISTRATION_ENDPOINT: string = URL_SHORTENER_BASE_ENDPOINT.concat('/user');

export const TABLE_COLUMNS = [
    { name: "Original URL" },
    { name: "Short URL" },
    { name: "Created At" },
    { name: "Expires At" },
    { name: "Delete" },
    { name: "Copy" },
];

export const THEMES = {
    dark: "dark",
    wireframe: "wireframe",
    light: "light"
};
