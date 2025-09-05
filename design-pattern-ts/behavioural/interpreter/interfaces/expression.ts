import { Context } from '../context/context';

export interface Expression {
    interpret(context: Context): number;
}
