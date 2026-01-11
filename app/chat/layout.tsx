export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
<div className="min-h-[100dvh] bg-gray-100 overflow-hidden">
      {children}
    </div>
  );
}
