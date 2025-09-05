export class Context {
    private variables: Map<string, number> = new Map();


    setVariable(name: string, value: number): void {
        this.variables.set(name, value);
    }

    getVariable(name: string): number {
        return this.variables.get(name) || 0;
    }

    hasVariable(name: string): boolean {
        return this.variables.has(name);
    }
}
