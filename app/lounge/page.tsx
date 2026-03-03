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

const GUEST_ID = "lounge_" + Math.random().toString(36).slice(2, 10);
const GUEST_NICK = "visitor_" + Math.random().toString(36).slice(2, 6);

export default function LoungePage() {
  const [messages, setMessages] = useState<LoungeMsg[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [connected, setConnected] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const esRef = useRef<EventSource | null>(null);

  // Load initial messages
  useEffect(() => {
    fetch("/api/lounge/messages?limit=50")
      .then((r) => r.json())
      .then((d) => {
        if (d.messages) setMessages(d.messages);
      });
  }, []);

  // SSE connection
  useEffect(() => {
    const es = new EventSource("/api/lounge/stream");
    esRef.current = es;

    es.addEventListener("connected", () => setConnected(true));

    es.onmessage = (event) => {
      try {
        const msg: LoungeMsg = JSON.parse(event.data);
        setMessages((prev) => {
          if (prev.some((m) => m.id === msg.id)) return prev;
          return [...prev, msg];
        });
      } catch {
        // ignore malformed
      }
    };

    es.onerror = () => setConnected(false);

    return () => {
      es.close();
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = useCallback(async () => {
    if (!input.trim() || sending) return;
    const content = input.trim();
    setInput("");
    setSending(true);

    try {
      const res = await fetch("/api/lounge/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, userId: GUEST_ID, nickname: GUEST_NICK }),
      });
      const data = await res.json();
      if (data.error) {
        alert(data.error.message);
      }
    } finally {
      setSending(false);
    }
  }, [input, sending]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Fan Lounge</h1>
          <p className="text-xs text-gray-500">음악 감정을 실시간으로 공유하는 공간</p>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className={`w-2 h-2 rounded-full ${connected ? "bg-green-500" : "bg-gray-600"}`}
          />
          <span className="text-xs text-gray-500">{connected ? "connected" : "connecting..."}</span>
        </div>
      </div>

      <div className="text-xs text-gray-600 bg-ep-surface border border-ep-border rounded-lg px-3 py-2">
        접속 중: <span className="text-ep-accent">{GUEST_NICK}</span>
      </div>

      {/* Message List */}
      <div className="border border-ep-border rounded-xl bg-ep-surface min-h-[400px] max-h-[500px] overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <div className="text-center text-gray-600 text-sm pt-16">
            아직 메시지가 없어. 첫 번째로 이야기해봐.
          </div>
        )}
        {messages.map((msg) => {
          const isMe = msg.authorUserId === GUEST_ID;
          return (
            <div key={msg.id} className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
              {!isMe && (
                <span className="text-xs text-gray-600 mb-1 px-1">{msg.authorNickname}</span>
              )}
              <div
                className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${
                  isMe
                    ? "bg-ep-accent/20 text-white rounded-br-sm"
                    : "bg-ep-border text-gray-200 rounded-bl-sm"
                }`}
              >
                {msg.content}
                {msg.cardPreview && (
                  <div className="mt-2 text-xs text-ep-accent/70 border-t border-ep-accent/20 pt-1">
                    [{msg.cardPreview.type}] {msg.cardPreview.shortLore}
                  </div>
                )}
              </div>
              <span className="text-xs text-gray-700 mt-0.5 px-1">
                {new Date(msg.createdAt).toLocaleTimeString("ko-KR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="지금 어떤 소리가 필요해? (최대 500자)"
          maxLength={500}
          className="flex-1 bg-ep-surface border border-ep-border rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-ep-accent/50"
        />
        <button
          onClick={sendMessage}
          disabled={sending || !input.trim()}
          className="px-4 bg-ep-accent text-white rounded-lg text-sm disabled:opacity-40 hover:bg-ep-accent/80 transition-colors"
        >
          {sending ? "..." : "보내기"}
        </button>
      </div>
    </div>
  );
}
