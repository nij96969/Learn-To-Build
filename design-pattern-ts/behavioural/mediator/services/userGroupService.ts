// userGroupService.ts
export class UserGroupService {
  async assignUserToGroup(userId: string, groupId: string) {
    console.log(`➡️ Assigning user ${userId} to group ${groupId}`);
    // Simulate DB insert
    return { userId, groupId, status: "assigned" };
  }
}
