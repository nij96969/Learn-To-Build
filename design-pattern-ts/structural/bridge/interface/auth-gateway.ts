export interface AuthGateway {
  authenticate(username: string, password?: string): Promise<boolean>;
  authorize(userId: string, resource: string): Promise<boolean>;
}
