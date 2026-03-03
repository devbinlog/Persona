"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import EmotionBadge from "@/components/EmotionBadge";
import LogCard from "@/components/LogCard";

const CHAR_NAME = "Echo";
const GUEST_USER_ID = "guest_" + Math.random().toString(36).slice(2, 10);

interface ChatMessage {
  id: string;
  role: "user" | "ai";
  content: string;
}

interface RecommendItem {
  title: string;
  artist: string;
  genre: string;
  tags: string[];
  soundDescription: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [emotionState, setEmotionState] = useState<string>("CALM");
  const [recommendations, setRecommendations] = useState<RecommendItem[]>([]);
  const [logCard, setLogCard] = useState<Record<string, unknown> | null>(null);
  const [convId, setConvId] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = useCallback(async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setLoading(true);

    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role: "user", content: userMsg },
    ]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          userId: GUEST_USER_ID,
          conversationId: convId,
        }),
      });
      const data = await res.json();

      if (data.error) {
        setMessages((prev) => [
          ...prev,
          { id: Date.now().toString(), role: "ai", content: `[오류] ${data.error.message}` },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { id: Date.now().toString(), role: "ai", content: data.reply },
        ]);
        setEmotionState(data.emotionState ?? "CALM");
        setRecommendations(data.recommendations ?? []);
        if (data.logCardId) {
          const cardRes = await fetch(`/api/cards/${data.logCardId}`);
          const cardData = await cardRes.json();
          if (cardData.payload) setLogCard(cardData.payload);
        }
        if (data.conversationId) setConvId(data.conversationId);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), role: "ai", content: "연결 오류가 발생했어." },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, convId]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">{CHAR_NAME}</h1>
          <p className="text-xs text-gray-500">Sound Interpreter</p>
        </div>
        <EmotionBadge state={emotionState} />
      </div>

      {/* Chat Window */}
      <div className="border border-ep-border rounded-xl bg-ep-surface min-h-[400px] max-h-[500px] overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-600 text-sm pt-12">
            지금 어떤 소리가 필요해?
          </div>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-ep-accent/20 text-white rounded-br-sm"
                  : "bg-ep-border text-gray-200 rounded-bl-sm"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="px-4 py-3 bg-ep-border rounded-2xl rounded-bl-sm flex gap-1">
              {[0, 1, 2].map((i) => (
                <span key={i} className="w-1.5 h-1.5 rounded-full bg-gray-400 typing-dot" />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="지금 어떤 감정이야?"
          rows={2}
          className="flex-1 bg-ep-surface border border-ep-border rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 resize-none focus:outline-none focus:border-ep-accent/50"
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          className="px-4 bg-ep-accent text-white rounded-lg text-sm disabled:opacity-40 hover:bg-ep-accent/80 transition-colors"
        >
          Send
        </button>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-xs text-gray-500 uppercase tracking-wider">Recommendations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {recommendations.map((r) => (
              <div
                key={r.title + r.artist}
                className="border border-ep-border rounded-lg p-3 bg-ep-surface space-y-1"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-white font-medium">{r.title}</p>
                    <p className="text-xs text-gray-500">{r.artist}</p>
                  </div>
                  <span className="text-xs text-gray-600 bg-white/5 px-1.5 py-0.5 rounded">
                    {r.genre}
                  </span>
                </div>
                <p className="text-xs text-gray-400">{r.soundDescription}</p>
                <div className="flex flex-wrap gap-1">
                  {r.tags.slice(0, 3).map((t) => (
                    <span key={t} className="text-xs text-gray-600">#{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Log Card */}
      {logCard && (
        <div className="space-y-2">
          <h2 className="text-xs text-gray-500 uppercase tracking-wider">Today&apos;s Log Card</h2>
          <LogCard payload={logCard as Parameters<typeof LogCard>[0]["payload"]} type="DAILY" />
        </div>
      )}
    </div>
  );
}
