// API Constants
export const BASE_SHORT_URL_ENDPOINT: string = 'http://localhost:8080/v1.0/rest/url-shortener';
export const GENERATE_SHORT_URL_ENDPOINT: string = BASE_SHORT_URL_ENDPOINT.concat('/generate');
export const GET_ALL_SHORT_URL_ENDPOINT: string = BASE_SHORT_URL_ENDPOINT;

export const TABLE_COLUMNS = [
    { name: "Original URL" },
    { name: "Short URL" },
    { name: "Created At" },
    { name: "Expires At" },
    { name: "Actions" },
];

export const THEMES = {
    dark: "dark",
    wireframe: "wireframe",
    light: "light"
};
