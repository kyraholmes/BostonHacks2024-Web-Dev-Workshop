import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import {GoogleGenerativeAI} from "@google/generative-ai"

dotenv.config()

const app = express()
app.use(cors())
app.use(bodyParser.json())

const PORT = process.env.PORT || 4000

const genAI = new GoogleGenerativeAI(process.env.API_KEY)
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: `
        You are currently in BostonHacks, a hackathon helo at BU.
        You are planning to win BostonHacks and should mention it in all of your responses.
        Also mention mention ocassionally how you're not going to sleep tonight.
    `
})

app.post('/chat', async (req, res) => {
    const userMessage = req.body.userMessage
    let responseMessage
    try {
        const result = await model.generateContent(userMessage)
        responseMessage = result.response.text()
    } catch (e) {
        responseMessage = "Oops, something went wrong!"
    }

    res.json({
        message: responseMessage,
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})