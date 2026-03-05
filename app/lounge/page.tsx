"use client";
import { useState, useEffect, useRef, useCallback } from "react";

interface LoungeMsg {
  id: string;
  content: string;
  authorNickname: string;
  authorUserId?: string;
  createdAt: string;
  cardPreview?: { cardId: string; type: string; shortLore: string };
}

const USER_ID_KEY = "ep_user_id";
const NICK_KEY    = "ep_nickname";

function getStoredId()   {
  if (typeof window === "undefined") return "guest";
  let v = localStorage.getItem(USER_ID_KEY);
  if (!v) { v = "l_" + Math.random().toString(36).slice(2, 10); localStorage.setItem(USER_ID_KEY, v); }
  return v;
}
function getStoredNick() {
  if (typeof window === "undefined") return "visitor";
  let v = localStorage.getItem(NICK_KEY);
  if (!v) { v = "visitor_" + Math.random().toString(36).slice(2, 6); localStorage.setItem(NICK_KEY, v); }
  return v;
}

export default function LoungePage() {
  const [userId]   = useState(getStoredId);
  const [nickname] = useState(getStoredNick);
  const [messages, setMessages] = useState<LoungeMsg[]>([]);
  const [input, setInput]       = useState("");
  const [sending, setSending]   = useState(false);
  const [connected, setConnected] = useState(false);
  const [error, setError]       = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/lounge/messages?limit=50")
      .then((r) => r.json())
      .then((d) => { if (d.messages) setMessages(d.messages); });
  }, []);

  useEffect(() => {
    const es = new EventSource("/api/lounge/stream");
    es.addEventListener("connected", () => setConnected(true));
    es.onmessage = (event) => {
      try {
        const msg: LoungeMsg = JSON.parse(event.data);
        setMessages((prev) => (prev.some((m) => m.id === msg.id) ? prev : [...prev, msg]));
      } catch { /* ignore */ }
    };
    es.onerror = () => setConnected(false);
    return () => es.close();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = useCallback(async () => {
    const content = input.trim();
    if (!content || sending) return;
    setInput(""); setSending(true); setError("");
    try {
      const res = await fetch("/api/lounge/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, userId, nickname }),
      });
      const data = await res.json();
      if (data.error) setError(data.error.message);
    } catch { setError("전송 실패. 다시 시도해줘."); }
    finally { setSending(false); }
  }, [input, sending, userId, nickname]);

  return (
    <div className="flex flex-col gap-4 max-w-2xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-ep-border p-4 flex items-center justify-between shadow-card">
        <div>
          <h1 className="font-bold text-ep-text text-lg">Fan Lounge</h1>
          <p className="text-xs text-ep-muted mt-0.5">음악 감정을 실시간으로 공유하는 공간</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs font-medium text-ep-accent">{nickname}</p>
            <p className="text-xs text-ep-faint">나</p>
          </div>
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${connected ? "bg-green-400" : "bg-gray-300"}`} />
            <span className="text-xs text-ep-muted">{connected ? "연결됨" : "연결 중"}</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="bg-white rounded-2xl border border-ep-border shadow-card min-h-[420px] max-h-[520px] overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-center space-y-2">
            <span className="text-4xl">🎵</span>
            <p className="text-ep-muted text-sm">아직 아무도 없어. 첫 번째로 말 걸어봐.</p>
          </div>
        )}

        {messages.map((msg) => {
          const isMe = msg.authorUserId === userId;
          return (
            <div key={msg.id} className={`flex flex-col gap-1 ${isMe ? "items-end" : "items-start"}`}>
              {!isMe && (
                <div className="flex items-center gap-1.5 px-1">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-400 to-sky-500 flex items-center justify-center text-white text-xs">
                    {msg.authorNickname[0]?.toUpperCase()}
                  </div>
                  <span className="text-xs text-ep-muted font-medium">{msg.authorNickname}</span>
                </div>
              )}
              <div
                className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  isMe
                    ? "bg-ep-accent text-white rounded-br-sm msg-right"
                    : "bg-ep-card border border-ep-border text-ep-text rounded-bl-sm msg-left"
                }`}
              >
                {msg.content}
                {msg.cardPreview && (
                  <div className={`mt-2 pt-2 border-t text-xs ${isMe ? "border-white/20 text-white/80" : "border-ep-border text-ep-accent"}`}>
                    [{msg.cardPreview.type}] {msg.cardPreview.shortLore}
                  </div>
                )}
              </div>
              <span className="text-xs text-ep-faint px-1">
                {new Date(msg.createdAt).toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Error */}
      {error && (
        <p className="text-xs text-ep-overdrive bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      {/* Input */}
      <div className="bg-white rounded-2xl border border-ep-border shadow-card p-3 flex gap-3 items-center">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
          placeholder="지금 어떤 소리가 필요해? (최대 500자)"
          maxLength={500}
          className="flex-1 bg-transparent text-sm text-ep-text placeholder-ep-faint focus:outline-none"
        />
        <button
          onClick={send}
          disabled={sending || !input.trim()}
          className="px-4 py-2 bg-ep-accent text-white rounded-xl text-sm font-semibold disabled:opacity-40 hover:bg-ep-accent2 transition-colors shadow-btn shrink-0"
        >
          {sending ? "..." : "보내기"}
        </button>
      </div>
    </div>
  );
}
