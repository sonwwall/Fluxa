package service

import (
	"context"
	"time"

	"fluxa-server/internal/article/model"
	"fluxa-server/internal/article/repository"
	articleresponse "fluxa-server/internal/article/response"
)

func (s *Service) WithdrawAuthorArticle(ctx context.Context, id string) (*articleresponse.ArticleStatusResult, error) {
	if err := s.repository.Transaction(ctx, func(repo *repository.Repository) error {
		article, err := repo.FindAuthorArticleByID(ctx, id)
		if err != nil {
			return err
		}

		applyWithdrawTransition(article, time.Now().UTC())
		return repo.SaveArticle(ctx, article)
	}); err != nil {
		return nil, err
	}

	return &articleresponse.ArticleStatusResult{ID: id, Status: model.StatusDraft}, nil
}

func applyWithdrawTransition(article *model.Article, now time.Time) {
	article.Status = model.StatusDraft
	article.PublishedAt = nil
	article.ScheduledAt = nil
	article.UpdatedAt = now
}
