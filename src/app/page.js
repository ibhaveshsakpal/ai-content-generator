"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!prompt.trim()) return;
    setLoading(true);

    try {
      const reponse = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await reponse.json();
      console.log("Data :", data);
      setResult(data.content);
    } catch (error) {
      console.error("Error :", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-blend-color-burn dark:bg-gray-900 min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">AI Content Generator</h1>
      <div className="w-full max-w-md">
        <form
          className="flex items-center gap-4 flex-col"
          onSubmit={handleSubmit}
        >
          <input
            className="border border-gray-300 rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            type="text"
            placeholder="Enter your prompt..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-2xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={loading}
          >
            Generate
          </button>
        </form>
      </div>
    </div>
  );
}
