"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { apiFetch } from "@/utils/api";
import { Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

type Notification = {
  _id: string;
  type: string;
  title: string;
  message?: string;
  data?: any;
  read?: boolean;
  createdAt?: string;
};

export default function NotificationBell() {
  const [items, setItems] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const loadedRef = useRef(false);

  const unreadCount = useMemo(() => items.filter((n) => !n.read).length, [items]);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await apiFetch("/api/notifications?limit=20", { auth: true, method: "GET" });
      const data = await (res as Response).json();
      const list = data?.data?.items || [];
      console.log(list)
      setItems(list);
    } catch (_) {
      // no-op
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loadedRef.current) {
      loadedRef.current = true;
      fetchNotifications();
    }
  }, []);

  const markAsRead = async (id: string) => {
    try {
      await apiFetch(`/api/notifications/${id}/read`, { method: "PATCH", auth: true });
      setItems((prev) => prev.map((n) => (n._id === id ? { ...n, read: true } : n)));
    } catch (_) {}
  };

  const markAllRead = async () => {
    try {
      await apiFetch(`/api/notifications/read-all`, { method: "POST", auth: true });
      setItems((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch (_) {}
  };

  return (
    <DropdownMenu open={open} onOpenChange={(o) => { setOpen(o); if (o) fetchNotifications(); }}>
      <DropdownMenuTrigger asChild>
        <button
          className="relative border border-solid border-[#eaecef] flex items-center justify-center rounded-full size-8"
          aria-label="Notifications"
          title="Notifications"
        >
          <Bell className="h-4 w-4 text-[#eaecef]" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1">
              <Badge className="px-1 py-0 h-4 min-w-4 text-[10px] leading-none rounded-full bg-red-600">{unreadCount}</Badge>
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0 overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200">
          <DropdownMenuLabel className="p-0">Notifications</DropdownMenuLabel>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost" onClick={fetchNotifications} disabled={loading}>{loading ? "…" : "Refresh"}</Button>
            <Button size="sm" variant="outline" onClick={markAllRead} disabled={items.length === 0 || unreadCount === 0}>Mark all read</Button>
          </div>
        </div>
        <ScrollArea className="max-h-80">
          {items.length === 0 ? (
            <div className="px-3 py-6 text-sm text-gray-500 text-center">No notifications yet</div>
          ) : (
            <div className="py-1">
              {items.map((n) => (
                <DropdownMenuItem key={n._id} className="px-3 py-2 focus:bg-gray-100/30 cursor-default" onSelect={(e) => e.preventDefault()}>
                  <div className="flex flex-col gap-1 w-full" onClick={() => markAsRead(n._id)}>
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-medium text-[13px] text-black">{n.title}</div>
                      {!n.read && <Badge variant="secondary" className="h-5">New</Badge>}
                    </div>
                    {n.message && <div className="text-xs text-black leading-snug">{n.message}</div>}
                    <div className="text-[10px] text-black mt-1">
                      {n.createdAt ? new Date(n.createdAt).toLocaleString() : ""}
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
