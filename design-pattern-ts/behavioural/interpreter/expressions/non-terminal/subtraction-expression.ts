import { Expression } from '../../interfaces/expression';
import { Context } from '../../context/context';

export class SubtractionExpression implements Expression {
    private leftExpression: Expression;
    private rightExpression: Expression;

    constructor(left: Expression, right: Expression) {
        this.leftExpression = left;
        this.rightExpression = right;
    }

    interpret(context: Context): number {
        const leftValue = this.leftExpression.interpret(context);
        const rightValue = this.rightExpression.interpret(context);
        return leftValue - rightValue;
    }

    getLeftExpression(): Expression {
        return this.leftExpression;
    }

    getRightExpression(): Expression {
        return this.rightExpression;
    }

    toString(): string {
        return `(${this.leftExpression.toString()} - ${this.rightExpression.toString()})`;
    }
}
