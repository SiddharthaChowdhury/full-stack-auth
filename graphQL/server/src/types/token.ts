export interface ITokenOptions {
    issuer: string;
    subject?: string;
    audience?: string;
    expiresIn: string;
    algorithm: string;
}

export interface ITokenPayload {
    _id: string;
    ip: string;
    browser?: string;
    version?: string;
    os?: string;
    source?: string;
    country?: string;
    city?: string;
    region?: string;
}