package service

import (
	"context"
	"time"

	"fluxa-server/internal/article/model"
	"fluxa-server/internal/article/repository"
	articlerequest "fluxa-server/internal/article/request"
	articleresponse "fluxa-server/internal/article/response"
)

func (s *Service) PublishAuthorArticle(ctx context.Context, id string, payload *articlerequest.PublishArticleRequest) (*articleresponse.ArticleStatusResult, error) {
	status := model.StatusPublished
	if payload.ScheduledAt != nil {
		status = model.StatusScheduled
	}

	if err := s.repository.Transaction(ctx, func(repo *repository.Repository) error {
		article, err := repo.FindAuthorArticleByID(ctx, id)
		if err != nil {
			return err
		}

		now := time.Now().UTC()
		applyPublishTransition(article, status, payload.ScheduledAt, now)
		return repo.SaveArticle(ctx, article)
	}); err != nil {
		return nil, err
	}

	return &articleresponse.ArticleStatusResult{ID: id, Status: status}, nil
}

func applyPublishTransition(article *model.Article, status string, scheduledAt *time.Time, now time.Time) {
	article.Status = status
	article.UpdatedAt = now
	if scheduledAt != nil {
		article.ScheduledAt = scheduledAt
		article.PublishedAt = nil
		return
	}

	article.ScheduledAt = nil
	article.PublishedAt = &now
}
