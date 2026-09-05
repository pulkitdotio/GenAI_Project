const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");


const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY,
})

const interviewReportSchema = z.object({
    matchScore: z.number().min(0).max(100).describe("The match score between the candidate and the job description, ranging from 0 to 100"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical questions can be asked in the interview"),
        intention: z.string().describe("The intention of the interviewer behind asking the technical question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The behavioral questions can be asked in the interview"),
        intention: z.string().describe("The intention of the interviewer behind asking the behavioral question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill that the candidate is lacking or needs improvement in"),
        severity: z.enum(['low', 'medium', 'high']).describe("The severity of the skill gap, whether it is low, medium or high")
    })).describe("Skill gaps identified in the candidate"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day of the preparation plan, starting from 1"),
        focus: z.string().describe("The focus of the preparation plan for that day"),
        tasks: z.array(z.string()).describe("The tasks to be completed on that day")
    })).describe("Preparation plan for the candidate to improve their skills and prepare for the interview"),
    title: z.string().describe("The title of the job for which the interview report is generated"),
})

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

    const prompt = `Generate an interview report for the candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}`

    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(interviewReportSchema)
        }
    })


    return JSON.parse(response.text)
}


module.exports = {
    generateInterviewReport
}