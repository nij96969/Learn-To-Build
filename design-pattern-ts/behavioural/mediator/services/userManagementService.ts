// userManagementService.ts
export class UserManagementService {
  async createUser(userData: any) {
    console.log("➡️ Creating user in User Management Service:", userData);
    // Simulate DB insert
    return { userId: "u123", ...userData };
  }
}
