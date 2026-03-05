"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import EmotionBadge from "@/components/EmotionBadge";
import LogCard from "@/components/LogCard";

const CHAR_NAME = "Echo";
const USER_ID_KEY = "ep_user_id";

function getUserId() {
  if (typeof window === "undefined") return "guest_000";
  let id = localStorage.getItem(USER_ID_KEY);
  if (!id) {
    id = "user_" + Math.random().toString(36).slice(2, 10);
    localStorage.setItem(USER_ID_KEY, id);
  }
  return id;
}

interface ChatMessage {
  id: string;
  role: "user" | "ai";
  content: string;
  streaming?: boolean;
}
interface RecommendItem {
  id: string;
  title: string;
  artist: string;
  genre: string;
  tags: string[];
  soundDescription: string;
}

const SUGGESTIONS = [
  "요즘 뭔가 텅 빈 느낌이야",
  "신나는 음악이 필요해",
  "오래된 기억이 자꾸 떠올라",
  "아무것도 하고 싶지 않아",
  "뭔가 새로운 걸 발견하고 싶어",
];

export default function ChatPage() {
  const [userId] = useState(getUserId);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [waiting, setWaiting] = useState(false);   // dots before stream starts
  const [streaming, setStreaming] = useState(false); // stream in progress
  const [emotionState, setEmotionState] = useState("CALM");
  const [recommendations, setRecommendations] = useState<RecommendItem[]>([]);
  const [logCard, setLogCard] = useState<Record<string, unknown> | null>(null);
  const [convId, setConvId] = useState<string | null>(null);
  const [showRecs, setShowRecs] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-grow textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 120) + "px";
  }, [input]);

  const sendMessage = useCallback(async (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg || waiting || streaming) return;
    setInput("");
    setWaiting(true);
    setShowRecs(false);
    setLogCard(null);

    // Add user bubble
    const userMsg: ChatMessage = { id: Date.now().toString(), role: "user", content: msg };
    setMessages((prev) => [...prev, userMsg]);

    // Prepare streaming AI bubble
    const aiId = `ai_${Date.now()}`;

    // Abort controller for cleanup
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    try {
      const res = await fetch("/api/chat/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, userId, conversationId: convId }),
        signal: ctrl.signal,
      });

      if (!res.ok || !res.body) throw new Error("Stream failed");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n\n");
        buffer = parts.pop() ?? "";

        for (const part of parts) {
          if (!part.startsWith("data: ")) continue;
          const raw = part.slice(6).trim();
          if (!raw) continue;

          let evt: Record<string, unknown>;
          try { evt = JSON.parse(raw); } catch { continue; }

          if (evt.type === "start") {
            // First chunk arrived — switch from dots to streaming bubble
            setWaiting(false);
            setStreaming(true);
            setMessages((prev) => [
              ...prev,
              { id: aiId, role: "ai", content: "", streaming: true },
            ]);
          } else if (evt.type === "chunk") {
            setMessages((prev) =>
              prev.map((m) =>
                m.id === aiId ? { ...m, content: m.content + (evt.text as string) } : m
              )
            );
          } else if (evt.type === "done") {
            // Finalise message, load metadata
            setMessages((prev) =>
              prev.map((m) =>
                m.id === aiId ? { ...m, streaming: false } : m
              )
            );
            setStreaming(false);
            setEmotionState((evt.emotionState as string) ?? "CALM");
            const recs = (evt.recommendations as RecommendItem[]) ?? [];
            setRecommendations(recs);
            if (recs.length) setShowRecs(true);
            if (evt.conversationId) setConvId(evt.conversationId as string);
            if (evt.logCardId) {
              const cardRes = await fetch(`/api/cards/${evt.logCardId}`);
              const cd = await cardRes.json();
              if (cd.payload) setLogCard(cd.payload);
            }
          } else if (evt.type === "error") {
            setWaiting(false);
            setStreaming(false);
            setMessages((prev) =>
              prev
                .filter((m) => m.id !== aiId)
                .concat({ id: aiId, role: "ai", content: `⚠ ${evt.message as string}` })
            );
          }
        }
      }
    } catch (e: unknown) {
      if ((e as Error)?.name === "AbortError") return;
      setWaiting(false);
      setStreaming(false);
      setMessages((prev) =>
        prev
          .filter((m) => m.id !== aiId)
          .concat({ id: aiId, role: "ai", content: "연결에 문제가 생겼어. 잠깐 후에 다시 시도해줘." })
      );
    } finally {
      setWaiting(false);
      setStreaming(false);
    }
  }, [input, waiting, streaming, userId, convId]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const isbusy = waiting || streaming;

  // Character avatar color by emotion
  const avatarCls = {
    CALM: "avatar-echo",
    SPARK: "bg-gradient-to-br from-amber-400 to-orange-500",
    ECHO: "avatar-echo",
    STATIC: "bg-gradient-to-br from-slate-400 to-slate-600",
    OVERDRIVE: "bg-gradient-to-br from-red-400 to-rose-600",
    HOLLOW: "bg-gradient-to-br from-gray-300 to-gray-500",
  }[emotionState] ?? "avatar-echo";

  return (
    <div className="flex flex-col gap-4 max-w-2xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-ep-border p-4 flex items-center gap-4 shadow-card">
        <div className={`w-12 h-12 rounded-2xl ${avatarCls} flex items-center justify-center text-white text-xl font-bold shadow-sm flex-shrink-0`}>
          ◎
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="font-bold text-ep-text">{CHAR_NAME}</h1>
            <span className="text-xs text-green-500 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />online
            </span>
          </div>
          <p className="text-xs text-ep-muted">Sound Interpreter · 음악으로 감정을 번역하는 AI</p>
        </div>
        <EmotionBadge state={emotionState} />
      </div>

      {/* Chat window */}
      <div className="bg-white rounded-2xl border border-ep-border shadow-card min-h-[420px] max-h-[520px] overflow-y-auto p-5 space-y-4">
        {/* Welcome */}
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 space-y-5 text-center">
            <div className={`w-16 h-16 rounded-2xl ${avatarCls} flex items-center justify-center text-white text-2xl shadow-btn`}>
              ◎
            </div>
            <div>
              <p className="text-ep-text font-semibold">안녕. 나는 {CHAR_NAME}야.</p>
              <p className="text-ep-muted text-sm mt-1">지금 어떤 소리가 필요해?</p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center max-w-sm">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="text-xs px-3 py-1.5 rounded-full bg-ep-card border border-ep-border text-ep-muted hover:border-blue-300 hover:text-ep-accent hover:bg-ep-accent-bg transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.role === "user" ? "justify-end msg-right" : "justify-start msg-left"}`}
          >
            {msg.role === "ai" && (
              <div className={`w-8 h-8 rounded-xl ${avatarCls} flex items-center justify-center text-white text-sm flex-shrink-0 mt-0.5`}>
                ◎
              </div>
            )}
            <div
              className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-ep-accent text-white rounded-br-sm"
                  : "bg-ep-card border border-ep-border text-ep-text rounded-bl-sm"
              }`}
            >
              {msg.content}
              {msg.streaming && <span className="streaming-cursor" />}
            </div>
            {msg.role === "user" && (
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center text-white text-xs flex-shrink-0 mt-0.5">
                U
              </div>
            )}
          </div>
        ))}

        {/* Typing dots — only while waiting for stream to start */}
        {waiting && (
          <div className="flex gap-3 msg-left">
            <div className={`w-8 h-8 rounded-xl ${avatarCls} flex items-center justify-center text-white text-sm flex-shrink-0`}>
              ◎
            </div>
            <div className="px-4 py-3 bg-ep-card border border-ep-border rounded-2xl rounded-bl-sm flex items-center gap-1.5">
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div className="bg-white rounded-2xl border border-ep-border shadow-card p-3 flex gap-3 items-end">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="지금 어떤 감정이야? (Shift+Enter 줄바꿈)"
          rows={1}
          disabled={isbusy}
          className="flex-1 resize-none bg-transparent text-sm text-ep-text placeholder-ep-faint focus:outline-none leading-relaxed py-1 disabled:opacity-60"
          style={{ maxHeight: "120px" }}
        />
        <button
          onClick={() => sendMessage()}
          disabled={isbusy || !input.trim()}
          className="px-4 py-2 bg-ep-accent text-white rounded-xl text-sm font-semibold disabled:opacity-40 hover:bg-ep-accent2 transition-colors shadow-btn shrink-0"
        >
          {streaming ? "생성 중" : waiting ? "..." : "전송"}
        </button>
      </div>

      {/* Recommendations */}
      {showRecs && recommendations.length > 0 && (
        <div className="bg-white rounded-2xl border border-ep-border shadow-card p-5 space-y-3 msg-left">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-ep-text">
              {CHAR_NAME}의 추천
            </h2>
            <span className="text-xs text-ep-muted">{recommendations.length}곡</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {recommendations.map((r) => (
              <div
                key={r.id}
                className="border border-ep-border rounded-xl p-3 bg-ep-card space-y-1.5 hover:border-blue-200 transition-colors"
              >
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <p className="text-sm font-semibold text-ep-text">{r.title}</p>
                    <p className="text-xs text-ep-muted">{r.artist}</p>
                  </div>
                  <span className="text-xs bg-ep-accent-bg text-ep-accent px-2 py-0.5 rounded-full font-medium shrink-0">
                    {r.genre}
                  </span>
                </div>
                <p className="text-xs text-ep-muted leading-relaxed">{r.soundDescription}</p>
                <div className="flex flex-wrap gap-1">
                  {r.tags.slice(0, 3).map((t) => (
                    <span key={t} className="text-xs text-ep-faint">#{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Log Card */}
      {logCard && (
        <div className="space-y-2 msg-left">
          <h2 className="text-sm font-semibold text-ep-text px-1">오늘의 로그 카드</h2>
          <LogCard
            payload={logCard as Parameters<typeof LogCard>[0]["payload"]}
            type="DAILY"
          />
        </div>
      )}
    </div>
  );
}
