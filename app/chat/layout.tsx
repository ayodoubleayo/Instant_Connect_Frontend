export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[100dvh] bg-gray-50 flex flex-col">
      {children}
    </div>
  );
}
