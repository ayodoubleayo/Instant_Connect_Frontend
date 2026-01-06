"use client";

import { useState } from "react";

export default function ImageUploader({
  onUpload,
  onUploading,
}: {
  onUpload: (url: string) => void;
  onUploading?: (preview: string | null) => void;
}) {
  const [loading, setLoading] = useState(false);

  async function upload(file: File) {
    if (!file) return;

    // 🔹 show preview immediately
    const preview = URL.createObjectURL(file);
    onUploading?.(preview);

    setLoading(true);

    const form = new FormData();
    form.append("image", file);

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

  return (
    <input
      type="file"
      accept="image/*"
      disabled={loading}
      onChange={(e) => upload(e.target.files![0])}
    />
  );
}
