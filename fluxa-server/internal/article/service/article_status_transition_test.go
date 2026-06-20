package service

import (
	"testing"
	"time"

	"fluxa-server/internal/article/model"
)

func TestApplyWithdrawTransitionReturnsArticleToDraft(t *testing.T) {
	publishedAt := time.Date(2026, 6, 20, 10, 0, 0, 0, time.UTC)
	scheduledAt := time.Date(2026, 6, 21, 10, 0, 0, 0, time.UTC)
	now := time.Date(2026, 6, 20, 11, 0, 0, 0, time.UTC)
	article := &model.Article{
		Status:      model.StatusPublished,
		PublishedAt: &publishedAt,
		ScheduledAt: &scheduledAt,
	}

	applyWithdrawTransition(article, now)

	if article.Status != model.StatusDraft {
		t.Fatalf("expected status %q, got %q", model.StatusDraft, article.Status)
	}
	if article.PublishedAt != nil {
		t.Fatal("expected published time to be cleared")
	}
	if article.ScheduledAt != nil {
		t.Fatal("expected scheduled time to be cleared")
	}
	if !article.UpdatedAt.Equal(now) {
		t.Fatalf("expected updated time %s, got %s", now, article.UpdatedAt)
	}
}

func TestApplyPublishTransitionPublishesArchivedArticle(t *testing.T) {
	now := time.Date(2026, 6, 20, 11, 0, 0, 0, time.UTC)
	article := &model.Article{Status: model.StatusArchived}

	applyPublishTransition(article, model.StatusPublished, nil, now)

	if article.Status != model.StatusPublished {
		t.Fatalf("expected status %q, got %q", model.StatusPublished, article.Status)
	}
	if article.PublishedAt == nil || !article.PublishedAt.Equal(now) {
		t.Fatalf("expected published time %s, got %v", now, article.PublishedAt)
	}
	if article.ScheduledAt != nil {
		t.Fatal("expected scheduled time to be cleared")
	}
}

func TestApplyPublishTransitionSchedulesArticle(t *testing.T) {
	now := time.Date(2026, 6, 20, 11, 0, 0, 0, time.UTC)
	scheduledAt := time.Date(2026, 6, 21, 10, 0, 0, 0, time.UTC)
	publishedAt := time.Date(2026, 6, 19, 10, 0, 0, 0, time.UTC)
	article := &model.Article{
		Status:      model.StatusDraft,
		PublishedAt: &publishedAt,
	}

	applyPublishTransition(article, model.StatusScheduled, &scheduledAt, now)

	if article.Status != model.StatusScheduled {
		t.Fatalf("expected status %q, got %q", model.StatusScheduled, article.Status)
	}
	if article.PublishedAt != nil {
		t.Fatal("expected published time to be cleared for scheduled article")
	}
	if article.ScheduledAt == nil || !article.ScheduledAt.Equal(scheduledAt) {
		t.Fatalf("expected scheduled time %s, got %v", scheduledAt, article.ScheduledAt)
	}
}
