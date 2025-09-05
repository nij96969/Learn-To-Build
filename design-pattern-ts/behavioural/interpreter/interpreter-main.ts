import { Context } from './context/context';
import { Expression } from './interfaces/expression';

// Terminal Expressions
import { NumberExpression } from './expressions/terminal/number-expression';
import { VariableExpression } from './expressions/terminal/variable-expression';

// Non-Terminal Expressions
import { AdditionExpression } from './expressions/non-terminal/addition-expression';
import { SubtractionExpression } from './expressions/non-terminal/subtraction-expression';
import { MultiplicationExpression } from './expressions/non-terminal/multiplication-expression';
import { DivisionExpression } from './expressions/non-terminal/division-expression';

/**
 * Demonstration of the Interpreter Pattern
 */
function demonstrateInterpreterPattern(): void {

    // Create a context for storing variables
    const context = new Context();
    context.setVariable('x', 10);
    context.setVariable('y', 5);
    context.setVariable('z', 2);

    console.log('\n1. Context Setup:');
    console.log("x: " + context.getVariable('x'));
    console.log("y: " + context.getVariable('y'));
    console.log("z: " + context.getVariable('z'));

    console.log('\n2. Simple Number Expression:');
    // Expression: 42
    const numberExpr = new NumberExpression(42);
    console.log(`Expression: ${numberExpr.toString()}`);
    console.log(`Result: ${numberExpr.interpret(context)}`);

    console.log('\n3. Variable Expression:');
    // Expression: x
    const variableExpr = new VariableExpression('x');
    console.log(`Expression: ${variableExpr.toString()}`);
    console.log(`Result: ${variableExpr.interpret(context)}`);

    console.log('\n4. Simple Addition:');
    // Expression: x + y
    const additionExpr = new AdditionExpression(
        new VariableExpression('x'),
        new VariableExpression('y')
    );
    console.log(`Expression: ${additionExpr.toString()}`);
    console.log(`Result: ${additionExpr.interpret(context)}`);

    console.log('\n5. Complex Expression:');
    // Expression: (x + y) * z
    const complexExpr1 = new MultiplicationExpression(
        new AdditionExpression(
            new VariableExpression('x'),
            new VariableExpression('y')
        ),
        new VariableExpression('z')
    );
    console.log(`Expression: ${complexExpr1.toString()}`);
    console.log(`Result: ${complexExpr1.interpret(context)}`);

    console.log('\n6. Very Complex Expression:');
    // Expression: ((x + y) * z) - (x / y)
    const complexExpr2 = new SubtractionExpression(
        new MultiplicationExpression(
            new AdditionExpression(
                new VariableExpression('x'),
                new VariableExpression('y')
            ),
            new VariableExpression('z')
        ),
        new DivisionExpression(
            new VariableExpression('x'),
            new VariableExpression('y')
        )
    );
    console.log(`Expression: ${complexExpr2.toString()}`);
    console.log(`Result: ${complexExpr2.interpret(context)}`);

    console.log('\n7. Expression with Numbers and Variables:');
    // Expression: (x + 100) / (y - 2)
    const mixedExpr = new DivisionExpression(
        new AdditionExpression(
            new VariableExpression('x'),
            new NumberExpression(100)
        ),
        new SubtractionExpression(
            new VariableExpression('y'),
            new NumberExpression(2)
        )
    );
    console.log(`Expression: ${mixedExpr.toString()}`);
    console.log(`Result: ${mixedExpr.interpret(context)}`);

    console.log('\n8. Changing Context Values:');
    context.setVariable('x', 20);
    context.setVariable('y', 10);
    console.log(`Updated context: ${context.toString()}`);
    console.log(`Same expression with new values: ${mixedExpr.interpret(context)}`);

    console.log('\n9. Error Handling - Division by Zero:');
    try {
        const divByZeroExpr = new DivisionExpression(
            new NumberExpression(10),
            new NumberExpression(0)
        );
        console.log(`Expression: ${divByZeroExpr.toString()}`);
        divByZeroExpr.interpret(context);
    } catch (error) {
        console.log(`Error caught: ${error instanceof Error ? error.message : error}`);
    }
}

demonstrateInterpreterPattern();
