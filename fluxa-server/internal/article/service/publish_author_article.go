package service

import (
	"context"
	"time"

	articleerrs "fluxa-server/internal/article/errs"
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
		if article.Status == model.StatusArchived {
			return articleerrs.ErrInvalidArticleStatus
		}

		now := time.Now().UTC()
		article.Status = status
		article.UpdatedAt = now
		if payload.ScheduledAt != nil {
			article.ScheduledAt = payload.ScheduledAt
			article.PublishedAt = nil
		} else {
			article.ScheduledAt = nil
			article.PublishedAt = &now
		}
		return repo.SaveArticle(ctx, article)
	}); err != nil {
		return nil, err
	}

	return &articleresponse.ArticleStatusResult{ID: id, Status: status}, nil
}
