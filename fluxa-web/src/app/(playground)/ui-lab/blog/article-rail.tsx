"use client";

import { Button, Card, Chip, Tabs } from "@heroui/react";

import { articles } from "./blog-data";

export function ArticleRail() {
  return (
    <Card className="border-white/10 bg-white/[0.035] p-4 shadow-[0_20px_70px_rgba(0,0,0,0.3)]">
      <Tabs aria-label="Article groups" defaultSelectedKey="latest">
        <Tabs.List>
          <Tabs.Tab id="latest">Latest</Tabs.Tab>
          <Tabs.Tab id="popular">Popular</Tabs.Tab>
          <Tabs.Tab id="series">Series</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel id="latest">
          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {articles.map((article) => (
              <Card
                className="min-h-52 border-white/10 bg-[#0c111d] p-4"
                key={article.title}
              >
                <div className="mb-5 h-20 rounded-xl bg-[linear-gradient(135deg,rgba(56,189,248,0.22),rgba(124,77,255,0.16)),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.22),transparent_32%)]" />
                <Chip className="mb-4 w-fit bg-white/[0.06] text-white/60" size="sm">
                  {article.category}
                </Chip>
                <Card.Title className="text-base leading-snug text-white">
                  {article.title}
                </Card.Title>
                <Card.Footer className="mt-auto p-0 pt-4 text-xs text-white/42">
                  {article.date} · {article.readTime}
                </Card.Footer>
              </Card>
            ))}
          </div>
          <div className="mt-4 flex justify-center">
            <Button size="sm" variant="ghost">
              View all articles
            </Button>
          </div>
        </Tabs.Panel>
      </Tabs>
    </Card>
  );
}
