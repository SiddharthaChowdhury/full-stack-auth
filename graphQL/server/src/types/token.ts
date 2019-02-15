export interface ITokenOptions {
    issuer: string;
    subject?: string;
    audience?: string;
    expiresIn: string;
    algorithm: string;
}