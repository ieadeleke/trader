"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { apiFetch } from "@/utils/api";

type ChatMessage = {
  _id: string;
  user: string;
  sender: "user" | "admin";
  text: string;
  createdAt: string;
  readByUser?: boolean;
  readByAdmin?: boolean;
};

export default function SupportChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    try { endRef.current?.scrollIntoView({ behavior: "smooth" }); } catch (_) {}
  };

  const fetchMessages = async () => {
    try {
      // Add cache buster and disable cache to ensure polling gets fresh data
      const res = await apiFetch(`/api/chat?limit=200&_=${Date.now()}` as any, {
        method: "GET",
        auth: true,
        // @ts-ignore - allow RequestInit cache flag
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" },
      });
      const payload = await res.json();
      if (payload?.success) {
        const items: ChatMessage[] = payload.data?.items || [];
        setMessages(items);
        try {
          sessionStorage.setItem("chatCache", JSON.stringify({ items }));
        } catch (_) {}
      }
    } catch (_) {}
  };

  const markRead = async () => {
    try {
      await apiFetch("/api/chat/read", { method: "PATCH", auth: true });
      try {
        // Update local last read marker for notification logic
        const last = messages[messages.length - 1];
        const ts = last ? new Date(last.createdAt).getTime() : Date.now();
        localStorage.setItem("chatLastReadAt", String(ts));
      } catch (_) {}
    } catch (_) {}
  };

  useEffect(() => {
    let timer: any;
    (async () => {
      // Hydrate from session cache to avoid flashing loader on return
      try {
        const cached = sessionStorage.getItem("chatCache");
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed?.items) && parsed.items.length > 0) {
            setMessages(parsed.items);
            setLoading(false);
          }
        }
      } catch (_) {}

      await fetchMessages();
      await markRead();
      setLoading(false);
      scrollToBottom();
    })();
    timer = setInterval(async () => {
      await fetchMessages();
      await markRead();
    }, 20000);
    return () => timer && clearInterval(timer);
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages.length]);

  // Track last read time locally for notification badges elsewhere
  useEffect(() => {
    try {
      if (messages.length > 0) {
        const last = messages[messages.length - 1];
        localStorage.setItem("chatLastReadAt", String(new Date(last.createdAt).getTime()));
      }
    } catch (_) {}
  }, [messages.length]);

  const onSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const text = input.trim();
    if (!text) return;
    setSending(true);
    try {
      const res = await apiFetch("/api/chat", { method: "POST", auth: true, json: { text } });
      const payload = await res.json();
      if (payload?.success) {
        setInput("");
        // Optimistically append, or refetch
        setMessages((prev) => [...prev, payload.data]);
        scrollToBottom();
      } else {
        await fetchMessages();
      }
    } catch (_) {
      await fetchMessages();
    } finally {
      setSending(false);
    }
  };

  return (
    <DashboardLayout pageTitle="Support Chat">
      <div className="w-full h-[calc(100vh-5rem)] flex flex-col">
        {/* Messages list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {loading && messages.length === 0 && (
            <div className="text-center text-gray-400 text-sm">Loading conversation…</div>
          )}
          {!loading && messages.length === 0 && (
            <div className="text-center text-gray-400 text-sm">
              No messages yet. Say hello and our support will respond shortly.
            </div>
          )}
          {messages.map((m) => (
            <div key={m._id} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[70%] whitespace-pre-wrap break-words rounded-lg px-3 py-2 text-sm ${
                m.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-900"
              }`}>
                <div className="opacity-90">{m.text}</div>
                <div className={`mt-1 text-[10px] opacity-70 ${m.sender === "user" ? "text-white" : "text-gray-700"}`}>
                  {new Date(m.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>

        {/* Composer */}
        <form onSubmit={onSend} className="border-t border-gray-200 p-3 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message…"
            className="flex-1 bg-white text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md px-3 text-sm h-14 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={sending || !input.trim()}
            className="bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md text-sm"
          >
            {sending ? "Sending…" : "Send"}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
