export function WelcomePanel() {
  return (
    <section className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.035] p-7">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(147,51,234,0.42),transparent_32%),radial-gradient(circle_at_70%_90%,rgba(59,130,246,0.26),transparent_36%)]" />
      <div className="relative">
        <h1 className="text-3xl font-semibold">Welcome back, 外城! 👋</h1>
        <p className="mt-3 text-white/66">
          Manage your content, build your blog, and share your ideas.
        </p>
      </div>
    </section>
  );
}
