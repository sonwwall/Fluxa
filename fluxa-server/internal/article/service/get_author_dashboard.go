package service

import (
	"context"

	articleresponse "fluxa-server/internal/article/response"
)

func (s *Service) GetAuthorDashboard(ctx context.Context) (*articleresponse.AuthorDashboardData, error) {
	counts, err := s.repository.CountAuthorStatuses(ctx)
	if err != nil {
		return nil, err
	}

	publishedThisMonth, err := s.repository.CountPublishedThisMonth(ctx)
	if err != nil {
		return nil, err
	}

	recent, err := s.repository.RecentAuthorArticles(ctx, 5)
	if err != nil {
		return nil, err
	}

	return &articleresponse.AuthorDashboardData{
		Summary: articleresponse.AuthorDashboardSummary{
			Greeting:           "Welcome back, Arjun",
			PublishedThisMonth: publishedThisMonth,
			PendingDrafts:      counts.Drafts,
		},
		Stats: []articleresponse.AuthorDashboardStat{
			{Label: "Published", Value: formatCount(counts.Published), Detail: formatCount(counts.Published) + " live now", Tone: "violet"},
			{Label: "Drafts", Value: formatCount(counts.Drafts), Detail: "needs review", Tone: "amber"},
			{Label: "Scheduled", Value: formatCount(counts.Scheduled), Detail: "next 7 days", Tone: "blue"},
			{Label: "Archived", Value: formatCount(counts.Archived), Detail: "withdrawn", Tone: "emerald"},
		},
		RecentArticles: toAuthorRows(recent),
		ChartPoints:    []int{720, 540, 680, 760, 720, 840, 930, 1120, 1540, 1390, 1040, 880},
	}, nil
}
