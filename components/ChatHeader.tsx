"use client";

interface Props {
  online: boolean;
  lastSeen: string | null;
}

export function ChatHeader({ online, lastSeen }: Props) {
  console.log("🧭 [ChatHeader] render START", {
    online,
    lastSeen,
  });

  let statusText: string;

  if (online) {
    statusText = "🟢 Online";
    console.log("🟢 [ChatHeader] user is ONLINE");
  } else if (lastSeen) {
    statusText = `Last seen ${new Date(lastSeen).toLocaleString()}`;
    console.log("🕒 [ChatHeader] user is OFFLINE with lastSeen", lastSeen);
  } else {
    statusText = "Offline";
    console.log("⚫ [ChatHeader] user is OFFLINE with no lastSeen");
  }

  console.log("🧭 [ChatHeader] render END", {
    statusText,
  });

  return (
    <div className="border-b px-4 py-3">
      <p className="font-semibold text-sm">{statusText}</p>
    </div>
  );
}
