"use client";

import { ReactNode, useRef, useState } from "react";

interface ImageUploaderProps {
  onUpload: (url: string) => void;
  onUploading?: (preview: string | null) => void;
  children?: ReactNode;
}

export default function ImageUploader({
  onUpload,
  onUploading,
  children,
}: ImageUploaderProps) {
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function upload(file: File) {
    if (!file) return;

    // 🔹 show preview immediately
    const preview = URL.createObjectURL(file);
    onUploading?.(preview);

    setLoading(true);

    const form = new FormData();
    form.append("photo", file);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/upload`,
      {
        method: "POST",
        body: form,
        credentials: "include",
      }
    );

    const data = await res.json();

    onUpload(data.url);

    // 🔹 cleanup
    onUploading?.(null);
    setLoading(false);
  }

  function openPicker() {
    if (!loading) {
      inputRef.current?.click();
    }
  }

  return (
    <>
      {/* Hidden real input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        disabled={loading}
        onChange={(e) => upload(e.target.files![0])}
      />

      {/* Clickable trigger */}
      <div onClick={openPicker}>
        {children ?? (
          <button
            type="button"
            disabled={loading}
            className="px-4 py-2 bg-black text-white rounded disabled:opacity-60"
          >
            Upload photo
          </button>
        )}
      </div>
    </>
  );
}
