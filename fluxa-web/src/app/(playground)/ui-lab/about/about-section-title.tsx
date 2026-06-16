type AboutSectionTitleProps = {
  children: string;
};

export function AboutSectionTitle({ children }: AboutSectionTitleProps) {
  return (
    <h2 className="flex items-center gap-3 text-2xl font-semibold text-white">
      <span className="h-5 w-1 rounded-full bg-violet-400 shadow-[0_0_16px_rgba(167,139,250,0.85)]" />
      {children}
    </h2>
  );
}
