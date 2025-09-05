import { Expression } from '../../interfaces/expression';
import { Context } from '../../context/context';

export class VariableExpression implements Expression {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    interpret(context: Context): number {
        if (!context.hasVariable(this.name)) {
            console.warn(`Variable '${this.name}' not found in context. Using default value 0.`);
        }
        return context.getVariable(this.name);
    }

    getName(): string {
        return this.name;
    }

    toString(): string {
        return this.name;
    }
}
