// orchestrationService.ts
import { UserManagementService } from "./services/userManagementService";
import { UserGroupService } from "./services/userGroupService";

export class OrchestrationService {
  private userService: UserManagementService;
  private groupService: UserGroupService;

  constructor() {
    this.userService = new UserManagementService();
    this.groupService = new UserGroupService();
  }

  // Mediator method
  async createUserAndAssignGroup(userData: any, groupId: string) {
    console.log("🚦 Starting orchestration workflow...");

    // Step 1: Create user
    const user = await this.userService.createUser(userData);

    // Step 2: Assign user to group
    const groupAssignment = await this.groupService.assignUserToGroup(
      user.userId,
      groupId
    );

    // Step 3: Consolidate response
    console.log("✅ Workflow complete.");
    return {
      user,
      groupAssignment,
      message: "User created and assigned to group successfully"
    };
  }
}
