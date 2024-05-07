export interface ITokenService {
    generateToken(userEmail: string): Promise<string>
}