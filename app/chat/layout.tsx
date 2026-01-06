export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen bg-gray-100 overflow-hidden">
      {children}
    </div>
  );
}
