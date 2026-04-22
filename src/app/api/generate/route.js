import OpenAI from "openai";

export async function POST(request) {
  const { prompt } = await request.json();

  // const generatedContent = `Generated content for prompt: ${prompt}`;

  const openai = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
  });

  try {
    const completion = await openai.chat.completions.create({
      model: "openai/gpt-oss-120b:free",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      stream: false,
    });

    return Response.json({
      success: true,
      content: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("API ERROR:", error);
    return Response.json({ error: "Failed to generate" }, { status: 500 });
  }
}
