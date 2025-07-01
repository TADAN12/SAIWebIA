
import { GoogleGenerativeAI ,SchemaType} from "@google/generative-ai";
import { nullable } from "zod";


const schema = {
    description: "List of questions for a quiz.",
    type: SchemaType.ARRAY,
    items:{
        type:SchemaType.OBJECT,
        properties:{
            question:{
                type:SchemaType.STRING,
                description:"The question to answer",
                nullable:false,
            },
            options:{
                type:SchemaType.ARRAY,
                description:"Posible answers to show, just only one is the correct, the same as the correct answer object",
                items:{
                    type:SchemaType.STRING,
                    description:"Posible answer",
                    nullable:false
                },
                nullable:false
            },
            correctAnswer:{
                type:SchemaType.STRING,
                description:"The correct answer, must be in the options array",
                nullable: false,
            },
            required: ["text"]
        }
    }
}

export default async function quizAI(text) {
    try {
        const genAI = new GoogleGenerativeAI("AIzaSyB0o_hPHlgYxqAakuk2shKUqQKrTX2DtUE");

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
        });

        

        const prompt = `Create a quiz according to this ${text} using this JSON schema, the correct answers should be in the options too:
    
    Quiz = {'quiestion': string,
            'options': Array<string>,
            'correctAnswer':string}
    Title = {
        'title':string
    }
    Return: Array<Title,Array<Quiz>>
    
    Is important to dont send any more data unless the arrat of objects.
    `;

        const result = await model.generateContent(prompt);
        return (result.response.text().slice(7,result.response.text().length-4));

    } catch (err) {
        return err.message
    }
}


