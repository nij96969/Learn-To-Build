// main.ts (entry point)
import { OrchestrationService } from "./orchestrationService";

async function main() {
  const orchestrator = new OrchestrationService();

  const result = await orchestrator.createUserAndAssignGroup(
    { name: "Alice", email: "alice@example.com" },
    "admins"
  );

  console.log("Final Result:", result);
}

main();