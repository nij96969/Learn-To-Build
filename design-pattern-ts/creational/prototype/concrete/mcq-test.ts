import { ITestPrototype } from "../interfaces/test-prototype";

export class MCQTest implements ITestPrototype {
    private title: string;
    private question: string[];
    private duration: number;

    constructor(title: string, question: string[], duration: number) {
        this.title = title;
        this.question = question;
        this.duration = duration;
    }

    clone(): MCQTest {
        return new MCQTest(
            this.title, 
            this.question.map(question => question), 
            this.duration
        );
    }


    display(): void {
        console.log(`Title: ${this.title}`);
        console.log(`Duration: ${this.duration}`);
        this.question.forEach((question, index) => {
            console.log(`Question ${index + 1}: ${question}`);
        });
    }
    
    editTest(title?: string, question?: string[], duration?: number): void {
        if(title) this.title = title;
        if(question) this.question = question;
        if(duration) this.duration = duration;
    }

    addQuestion(question: string): void {
        this.question.push(question);
    }
}