import { MCQTest } from "./concrete/mcq-test";

function executePrototype() {
    const mcqTest = new MCQTest("MCQ Test", ["What is the capital of France?", "What is the capital of Germany?"], 30);
    const mcqTestClone = mcqTest.clone();

    mcqTest.addQuestion("What is the capital of India?");
    
    mcqTestClone.editTest("redemdial MCQ Test", undefined, 45);
    mcqTestClone.addQuestion("What is the capital of Italy?");

    mcqTest.display();
    console.log("--------------------------------");
    mcqTestClone.display();
}

executePrototype();