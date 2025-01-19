export interface ApiResponse {
    status: string;
    result: UrlResponse;
    errorData: ErrorData;
}

export interface UrlResponse {
    originalUrl: string;
    shortUrl: string;
    creationDateTime: string;
    expirationDateTime: string;
}

export interface ErrorData {
    errorCode: string;
    errorMessage: string;
    details: string;
}

export interface UrlFormData {
    url: string;
}

// export type { ApiResponse, ErrorData };