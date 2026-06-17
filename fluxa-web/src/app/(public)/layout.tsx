export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="dark min-h-screen bg-[#060913] text-white">{children}</div>;
}
