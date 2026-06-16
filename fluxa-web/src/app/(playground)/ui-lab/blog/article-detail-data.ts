export const articleDetail = {
  category: "Systems",
  date: "May 12, 2024",
  readTime: "12 min read",
  subtitle:
    "A practical guide to building architecture that stays reliable, observable, and evolvable as your system and team grow.",
  tags: ["Systems", "Architecture", "Resilience", "Scalability"],
  title: "Designing Resilient Systems That Scale",
  views: "3.2K views",
};

export const articleMarkdown = `# Why Resilience Matters

Systems fail. Networks partition. Dependencies slow down. The only question is whether your system can adapt to those failures without cascading into an outage.

> Resilience is not about preventing failure. It is about ensuring failure is contained, recovered from, and learned from.

Designing for resilience from the beginning saves you from painful rewrites and builds confidence with your users.

## Core Principles

Resilient systems are built on a few foundational principles. These are not concrete rules, but guidance that helps shape better architectural decisions.

- **Isolate Failure:** Limit the blast radius so one failure does not bring down everything.
- **Embrace Redundancy:** Add capacity across services and regions.
- **Design for Recovery:** Build fast, safe recovery paths and test them.
- **Make It Observable:** You cannot fix what you cannot see.
- **Automate Operations:** Reduce manual steps and human error.

## Architectural Patterns

Certain architectural patterns consistently lead to resilient, scalable systems.

### Circuit Breaker

Prevent cascading failures by stopping calls to a failing dependency.

\`\`\`go
if failureRate > threshold {
    openCircuit()
    return fallbackResponse()
}

try {
    return callDependency()
} catch err {
    recordFailure(err)
    throw err
}
\`\`\`

Circuit breakers give dependencies time to recover and keep your system responsive.

### Bulkhead Isolation

Separate resources by workload so one overloaded path cannot exhaust the entire application.

### Timeouts & Retries

Every network call should have a timeout. Retries should use backoff and jitter so recovery does not create more traffic than the original failure.

### Idempotency

Operations that may be retried should be safe to run more than once. Idempotency keys are often the simplest practical solution.

## Observability at Scale

Resilience depends on feedback. Metrics show trends, logs tell stories, and traces reveal the shape of user requests across service boundaries.

- Metrics answer what is changing.
- Logs explain what happened.
- Traces show where time is spent.
- Alerts tell the team when action is needed.

## Bringing It Together

The strongest systems are designed around expected failure. They keep core paths small, isolate unstable dependencies, and create enough visibility for engineers to make calm decisions under pressure.

## Key Takeaways

Resilience is a product quality, not just an infrastructure concern. Users feel it every time a product continues to work while the world around it is messy.
`;

export const articleToc = [
  ["1.", "Why Resilience Matters", true],
  ["2.", "Core Principles", false],
  ["", "Isolate Failure", false],
  ["", "Embrace Redundancy", false],
  ["", "Design for Recovery", false],
  ["", "Make It Observable", false],
  ["", "Automate Operations", false],
  ["3.", "Architectural Patterns", false],
  ["3.1", "Circuit Breaker", false],
  ["3.2", "Bulkhead Isolation", false],
  ["3.3", "Timeouts & Retries", false],
  ["3.4", "Idempotency", false],
  ["4.", "Observability at Scale", false],
  ["", "Metrics", false],
  ["", "Logs", false],
  ["", "Traces", false],
  ["", "Alerts", false],
  ["5.", "Bringing It Together", false],
  ["6.", "Key Takeaways", false],
] as const;

export const relatedArticles = [
  ["Observability 101: Logs, Metrics, Traces", "May 5, 2024 · 11 min read"],
  ["Building LLM Apps That Don't Break", "May 8, 2024 · 10 min read"],
  ["Advanced Next.js Patterns for Production", "Apr 28, 2024 · 9 min read"],
] as const;
