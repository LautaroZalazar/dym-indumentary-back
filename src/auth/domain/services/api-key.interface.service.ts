export interface IApiKeyService {
    validateApiKey(apiKey: string, done: (error: Error, data) => any): any
}