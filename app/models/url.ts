export interface ErrorData {
    errorCode: string;
    errorMessage: string;
    details: string | null;
}

export interface ApiResponse {
    status: string;
    result: UrlResponse | null;
    errorData: ErrorData | null;
}

export interface UrlResponse {
    originalUrl: string;
    shortUrl: string;
    creationDateTime: string;
    expirationDateTime: string;
}

export interface UrlFormData {
    url: string;
}

// export type { ApiResponse, ErrorData };