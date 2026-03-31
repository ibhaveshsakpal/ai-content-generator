"use client";

import { useState } from "react";
import Markdown from "react-markdown";
import { FiSend } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { promptTemplates } from "@/contants/promptTemplates";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
  };

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
    <div className="min-h-screen font-sans bg-gradient-to-br from-zinc-950 via-slate-950 to-indigo-950 text-white">
      <main className="flex flex-col items-center px-4 sm:px-6 py-8 sm:py-10">
        <div className="w-full max-w-4xl flex flex-col gap-6 sm:gap-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-cyan-300 via-indigo-300 to-pink-300 bg-clip-text text-transparent">
              AI Content Generator
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-white/70">
              Turn ideas into captions, emails, posts & descriptions instantly.
            </p>
          </div>

          <div className="rounded-3xl sm:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-4 sm:p-5 md:p-6">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="text"
                placeholder="Type something like: Tell me a knock-knock joke..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="flex-1 w-full px-4 sm:px-5 py-3 sm:py-4 rounded-2xl sm:rounded-3xl border border-white/10 bg-black/30 text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-cyan-400/60 focus:border-cyan-400/50 transition text-sm sm:text-base"
              />

              <button
                type="submit"
                disabled={loading}
                className="h-12 w-full sm:w-12 flex items-center justify-center rounded-2xl sm:rounded-full text-black
              bg-gradient-to-r from-cyan-300 via-indigo-300 to-pink-300
              shadow-lg shadow-indigo-500/20
              hover:brightness-110 hover:shadow-indigo-500/40
              active:scale-95 transition
              disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin" />
                ) : (
                  <FiSend className="h-5 w-5" />
                )}
              </button>
            </form>
            {promptTemplates.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {promptTemplates.map((template, index) => (
                  <button
                    key={index}
                    onClick={() => setPrompt(template.template)}
                    className="text-xs sm:text-sm px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white/70 hover:bg-white/20 cursor-pointer"
                  >
                    {template.label}
                  </button>
                ))}
              </div>
            )}
            <span className="text-xs text-white/50 mt-4 block">
              ⚡ Note: This app uses a free AI API, so responses may take a few
              seconds depending on prompt complexity.{" "}
            </span>
          </div>

          <div className="relative rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl shadow-2xl overflow-hidden">
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.35),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(167,139,250,0.35),transparent_55%),radial-gradient(circle_at_center,rgba(244,114,182,0.25),transparent_60%)]" />

            <div className="relative p-4 sm:p-6 md:p-8 min-h-[240px] sm:min-h-[280px]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
                <h2 className="text-xs sm:text-sm font-semibold tracking-wide text-white/80 uppercase">
                  Output
                </h2>

                <span
                  onClick={handleCopy}
                  className="w-fit text-[10px] sm:text-xs px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white/70 hover:bg-white/20 cursor-pointer "
                >
                  Copy
                </span>
              </div>

              {loading ? (
                <div className="space-y-3">
                  <div className="h-4 w-3/4 rounded-full bg-white/10 animate-pulse" />
                  <div className="h-4 w-full rounded-full bg-white/10 animate-pulse" />
                  <div className="h-4 w-5/6 rounded-full bg-white/10 animate-pulse" />
                  <div className="h-4 w-2/3 rounded-full bg-white/10 animate-pulse" />
                </div>
              ) : result ? (
                <div className="w-full">
                  <div className="whitespace-pre-line leading-relaxed text-sm sm:text-base text-white/90">
                    <Markdown>{result}</Markdown>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center min-h-[180px] sm:min-h-[200px] gap-2">
                  <p className="text-white/70 text-sm sm:text-base">
                    Your generated content will appear here.
                  </p>
                  <p className="text-white/40 text-xs sm:text-sm">
                    Try prompts like: “Write a funny caption for a bike ride
                    reel”
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
