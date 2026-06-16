"use client";

import { Button, Card, Chip } from "@heroui/react";

export function AboutHero() {
  return (
    <section className="grid gap-8 pt-8 lg:grid-cols-[1fr_480px] lg:items-center">
      <div className="max-w-2xl">
        <p className="text-lg font-medium text-violet-300">About me</p>
        <h1 className="mt-5 text-5xl font-semibold leading-tight tracking-tight sm:text-6xl">
          Hi, I&apos;m{" "}
          <span className="bg-[linear-gradient(90deg,#c084fc,#60a5fa)] bg-clip-text text-transparent">
            外城.
          </span>
        </h1>
        <p className="mt-4 max-w-xl text-3xl leading-snug text-white/66">
          I build backend systems, explore Go, and write about the process of
          becoming a better engineer.
        </p>
        <p className="mt-7 max-w-xl text-base leading-7 text-white/48">
          软件工程专业学生，热爱构建高性能的后端系统，喜欢探索新技术，也喜欢把学习和实践的过程记录下来。
        </p>
        <div className="mt-7 flex gap-4 text-2xl text-white/45">
          <span>GitHub</span>
          <span>Email</span>
          <span>in</span>
        </div>
      </div>

      <Card className="overflow-hidden border-white/15 bg-white/[0.045] shadow-[0_24px_80px_rgba(79,70,229,0.22)]">
        <div className="relative p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(99,102,241,0.34),transparent_42%),radial-gradient(circle_at_80%_20%,rgba(56,189,248,0.18),transparent_38%)]" />
          <div className="relative flex items-center gap-6">
            <div className="relative grid h-32 w-32 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,#818cf8,#4f46e5)]">
              <span className="text-5xl">外</span>
              <span className="absolute bottom-3 right-3 h-5 w-5 rounded-full border-2 border-[#101827] bg-emerald-400" />
            </div>
            <div>
              <h2 className="text-3xl font-semibold">外城</h2>
              <p className="mt-2 text-white/70">Software Engineering Student</p>
              <p className="mt-1 text-white/58">Backend Developer</p>
            </div>
          </div>
          <dl className="relative mt-8 grid gap-5 border-t border-white/10 pt-6 text-sm">
            {[
              ["Location", "Chongqing, China"],
              ["Education", "Software Engineering"],
              ["Focus", "Backend · Go · Systems"],
              ["Currently", "Building Fluxa"],
            ].map(([label, value]) => (
              <div className="grid grid-cols-[110px_1fr] gap-4" key={label}>
                <dt className="text-white/60">{label}</dt>
                <dd className="text-white/84">
                  {value === "Building Fluxa" ? (
                    <>
                      Building <span className="text-violet-300">Fluxa</span>
                    </>
                  ) : (
                    value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Card>

      <div className="flex flex-wrap gap-3 lg:col-span-2">
        <Button variant="primary">Email me</Button>
        <Button variant="secondary">GitHub</Button>
        <Button variant="outline">Resume</Button>
        <Chip className="ml-auto hidden bg-emerald-400/12 text-emerald-200 lg:flex">
          Available for Internship
        </Chip>
      </div>
    </section>
  );
}
