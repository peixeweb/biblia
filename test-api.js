const Groq = require("groq-sdk");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

async function test() {
    console.log("Testing Groq API...");
    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: "user", content: "Who is Jesus?" },
            ],
            model: "llama-3.3-70b-versatile",
        });
        console.log("Result:", chatCompletion.choices[0]?.message?.content);
    } catch (e) {
        console.error("Error:", e.message);
    }
}

test();