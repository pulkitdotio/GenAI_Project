const { GoogleGenAI } = require("@google/genai");


const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY,
})



async function invokeGeminiAi(){
    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: "Hello Gemini!"  
    })

    console.log(response.text)
}



module.exports = {
    invokeGeminiAi
}