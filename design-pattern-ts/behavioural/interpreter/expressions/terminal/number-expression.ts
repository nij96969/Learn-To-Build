/**
 * Number Expression (Terminal Expression)
 * 
 * This class represents a numeric literal in our language.
 * It's a terminal expression because it doesn't contain other expressions.
 */

import { Expression } from '../../interfaces/expression';
import { Context } from '../../context/context';

export class NumberExpression implements Expression {
    private value: number;

    constructor(value: number) {
        this.value = value;
    }

    interpret(context: Context): number {
        return this.value;
    }

    getValue(): number {
        return this.value;
    }

    toString(): string {
        return this.value.toString();
    }
}
