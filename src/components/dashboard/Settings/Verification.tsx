"use client";

import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/context/ToastContext";
import { apiFetch } from "@/utils/api";

type DocRequest = {
  _id: string;
  title: string;
  description?: string;
  status: "requested" | "uploaded" | "approved" | "rejected";
  file?: {
    url?: string;
    filename?: string;
    mimetype?: string;
    size?: number;
    path?: string;
  };
  createdAt?: string;
};

export default function Verification() {
  const { successToast, errorToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<DocRequest[]>([]);
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await apiFetch("/api/verification/requests", { method: "GET", auth: true });
      const data = await res.json().catch(() => ({}));
      const list: DocRequest[] = data?.data || data || [];
      setItems(Array.isArray(list) ? list : []);
    } catch (e: any) {
      console.error(e);
      errorToast(e?.message || "Failed to load verification requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleUpload = async (id: string, file: File | undefined | null) => {
    if (!file) return;
    setUploadingId(id);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await apiFetch(`/api/verification/requests/${id}/upload`, {
        method: "POST",
        auth: true,
        // @ts-ignore formdata body
        body: fd,
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.message || "Upload failed");
      }
      successToast("Document uploaded");
      await load();
    } catch (e: any) {
      console.error(e);
      errorToast(e?.message || "Upload failed");
    } finally {
      setUploadingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold">Verification</h3>
        <p className="text-sm opacity-70">Upload documents requested by the admin.</p>
      </div>

      {loading ? (
        <div className="text-sm opacity-70">Loading...</div>
      ) : items.length === 0 ? (
        <div className="text-sm opacity-70">No document requests at the moment.</div>
      ) : (
        <div className="space-y-4">
          {items.map((it) => (
            <div key={it._id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-medium">{it.title}</div>
                  {it.description ? (
                    <div className="text-sm opacity-70 mt-1">{it.description}</div>
                  ) : null}
                  <div className="mt-2 text-xs">
                    <span className="px-2 py-1 rounded bg-border/40">{it.status}</span>
                    {it.file?.url ? (
                      <a
                        href={it.file.url}
                        target="_blank"
                        rel="noreferrer"
                        className="ml-3 text-blue-500 hover:underline"
                      >
                        View uploaded
                      </a>
                    ) : null}
                  </div>
                </div>
                <div className="min-w-[220px]">
                  <Label className="text-xs block mb-2">Upload file</Label>
                  <Input
                    type="file"
                    accept="image/*,application/pdf"
                    disabled={uploadingId === it._id}
                    onChange={(e) => handleUpload(it._id, e.target.files?.[0])}
                    className="h-[2.8rem]"
                  />
                  <div className="text-[11px] opacity-60 mt-2">Images or PDF. Max 10MB.</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

