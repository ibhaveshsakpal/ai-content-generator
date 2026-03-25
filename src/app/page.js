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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 font-sans flex flex-col">
      <main className="flex-1 flex flex-col items-center px-4 py-8">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white p-2">
          AI Content Generator
        </h1>
        <div className="w-full max-w-3xl space-y-4 pt-5">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="text"
              placeholder="Enter your prompt..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 
            bg-white dark:bg-gray-800 text-gray-800 dark:text-white
            focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl font-medium text-white 
            bg-blue-500 hover:bg-blue-600 
            transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "..." : "Generate"}
            </button>
          </form>
        </div>

        <div className="w-full max-w-3xl mt-8">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 min-h-[200px]">
            {loading ? (
              <p className="text-gray-500">Generating content...</p>
            ) : result ? (
              <p className="text-gray-700 dark:text-gray-200 whitespace-pre-line leading-relaxed">
                {result}
              </p>
            ) : (
              <p className="text-gray-400">
                Your generated content will appear here...
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
