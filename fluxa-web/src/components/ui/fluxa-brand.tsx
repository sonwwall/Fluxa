type FluxaLogoMarkProps = {
  className?: string;
};

type FluxaBrandProps = {
  className?: string;
  markClassName?: string;
  textClassName?: string;
};

export function FluxaLogoMark({ className = "h-10 w-10" }: FluxaLogoMarkProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 128 128"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="fluxa-cyan" x1="22" x2="106" y1="28" y2="30">
          <stop stopColor="#15E4FF" />
          <stop offset="0.48" stopColor="#2775FF" />
          <stop offset="1" stopColor="#8F5CFF" />
        </linearGradient>
        <linearGradient id="fluxa-violet" x1="30" x2="105" y1="72" y2="58">
          <stop stopColor="#6EA2FF" />
          <stop offset="0.48" stopColor="#5D36FF" />
          <stop offset="1" stopColor="#F05BFF" />
        </linearGradient>
        <linearGradient id="fluxa-tail" x1="26" x2="66" y1="82" y2="113">
          <stop stopColor="#A9C7FF" />
          <stop offset="0.45" stopColor="#4B5CFF" />
          <stop offset="1" stopColor="#8E24FF" />
        </linearGradient>
        <radialGradient id="fluxa-glow" cx="32%" cy="54%" r="55%">
          <stop stopColor="#FFFFFF" stopOpacity="0.75" />
          <stop offset="0.36" stopColor="#5AA5FF" stopOpacity="0.3" />
          <stop offset="1" stopColor="#050913" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path
        d="M27 75C31 45 48 31 78 31c16 0 28-4 38-13-4 19-17 34-40 38-22 4-37 7-49 19Z"
        fill="url(#fluxa-cyan)"
      />
      <path
        d="M27 75C36 55 55 49 82 49c13 0 24-4 34-13-9 18-23 28-45 31-20 3-33 4-44 8Z"
        fill="#0820A7"
        opacity="0.55"
      />
      <path
        d="M24 86c16-25 36-36 63-34 11 1 21-3 31-11-8 19-25 34-50 38-18 3-32 4-44 7Z"
        fill="url(#fluxa-violet)"
      />
      <path
        d="M24 86c12-9 27-13 46-13 18 0 33-6 45-18-8 21-23 34-45 40-18 5-31 11-42 21 2-14 1-23-4-30Z"
        fill="url(#fluxa-tail)"
      />
      <path
        d="M24 86c13-14 28-21 46-22 17-1 32-7 45-18-9 18-24 29-44 33-20 4-35 16-43 37 2-14 1-23-4-30Z"
        fill="url(#fluxa-glow)"
      />
      <path
        d="M25 86c21-8 40-10 57-8-23 5-40 16-54 38 2-13 1-22-3-30Z"
        fill="#1F2EFF"
        opacity="0.36"
      />
    </svg>
  );
}

export function FluxaBrand({
  className = "flex items-center gap-3",
  markClassName = "h-10 w-10",
  textClassName = "text-2xl",
}: FluxaBrandProps) {
  return (
    <span className={className}>
      <FluxaLogoMark className={markClassName} />
      <span
        className={`${textClassName} font-semibold leading-none tracking-[0.045em] text-white [text-shadow:0_1px_18px_rgba(255,255,255,0.18)]`}
      >
        Fluxa
      </span>
    </span>
  );
}
