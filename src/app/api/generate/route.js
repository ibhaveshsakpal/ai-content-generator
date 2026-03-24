export async function POST(request) {
  const { prompt } = await request.json();

  const generatedContent = `Generated content for prompt: ${prompt}`;

  return Response.json({
    success: true,
    content: generatedContent,
  });
}
