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
  attachments?: Array<{
    url: string;
    name?: string;
    mimeType?: string;
    size?: number;
  }>;
  // Fallback some backends return array of urls
  attachmentUrls?: string[];
};

export default function SupportChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [input, setInput] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
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
    if (!text && files.length === 0) return;
    setSending(true);
    try {
      let res: Response;
      if (files.length > 0) {
        const fd = new FormData();
        if (text) fd.append("text", text);
        // Append using common field names for compatibility
        files.forEach((f) => {
          fd.append("files", f);
          fd.append("attachments", f);
        });
        res = await apiFetch("/api/chat", { method: "POST", auth: true, body: fd } as any);
      } else {
        res = await apiFetch("/api/chat", { method: "POST", auth: true, json: { text } });
      }
      const payload = await res.json();
      if (payload?.success) {
        setInput("");
        setFiles([]);
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

  const onPickFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = e.target.files;
    if (!list) return;
    const next: File[] = [...files];
    const MAX_FILES = 10;
    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    for (let i = 0; i < list.length; i++) {
      const f = list.item(i)!;
      if (f.size > MAX_SIZE) continue; // skip too big
      if (next.length < MAX_FILES) next.push(f);
    }
    setFiles(next);
    // reset input so same file can be chosen again later
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeFileAt = (idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const isImage = (name?: string, type?: string) => {
    if (type && type.startsWith("image/")) return true;
    if (!name) return false;
    return /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(name);
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
              <div
                className={`max-w-[70%] whitespace-pre-wrap break-words rounded-lg px-3 py-2 text-sm ${
                  m.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-900"
                }`}
              >
                {m.text ? <div className="opacity-90">{m.text}</div> : null}

                {/* Attachments (images or files) */}
                {(() => {
                  const atts = (m.attachments && m.attachments.length > 0)
                    ? m.attachments
                    : (m.attachmentUrls || []).map((u) => ({ url: u }));
                  if (!atts || atts.length === 0) return null;
                  return (
                    <div className={`mt-2 grid gap-2 ${m.sender === "user" ? "text-white" : "text-gray-900"}`}
                         style={{ gridTemplateColumns: "repeat(auto-fill,minmax(120px,1fr))" }}>
                      {atts.map((a, idx) => {
                        const name = a.name || a.url.split("/").pop() || "attachment";
                        const img = isImage(name, a.mimeType);
                        return (
                          <a
                            key={idx}
                            href={a.url}
                            target="_blank"
                            rel="noreferrer"
                            className={`block rounded-md overflow-hidden border ${m.sender === "user" ? "border-white/30" : "border-black/10"}`}
                          >
                            {img ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={a.url} alt={name} className="w-full h-28 object-cover" />
                            ) : (
                              <div className="p-2 text-xs break-all">
                                {name}
                              </div>
                            )}
                          </a>
                        );
                      })}
                    </div>
                  );
                })()}

                <div className={`mt-1 text-[10px] opacity-70 ${m.sender === "user" ? "text-white" : "text-gray-700"}`}>
                  {new Date(m.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>

        {/* Composer */}
        <form onSubmit={onSend} className="border-t border-gray-200 p-3 space-y-2">
          {/* Selected attachments preview */}
          {files.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {files.map((f, idx) => (
                <div key={idx} className="relative border rounded-md p-2 text-xs bg-white">
                  <div className="max-w-[200px] break-all pr-5">
                    {isImage(f.name, f.type) ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={URL.createObjectURL(f)} alt={f.name} className="w-28 h-20 object-cover rounded" />
                    ) : (
                      <span>{f.name}</span>
                    )}
                  </div>
                  <button
                    type="button"
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs"
                    onClick={() => removeFileAt(idx)}
                    aria-label="Remove attachment"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message…"
              className="flex-1 bg-white text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md px-3 text-sm h-14 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={onPickFiles}
              className="hidden"
              accept="image/*,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="bg-gray-100 border border-gray-300 text-gray-800 px-3 py-2 rounded-md text-sm hover:bg-gray-200"
              disabled={sending}
            >
              Attach
            </button>

            <button
              type="submit"
              disabled={sending || (!input.trim() && files.length === 0)}
              className="bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md text-sm"
            >
              {sending ? "Sending…" : "Send"}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
