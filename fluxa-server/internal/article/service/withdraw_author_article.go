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

		article.Status = model.StatusArchived
		article.ScheduledAt = nil
		article.UpdatedAt = time.Now().UTC()
		return repo.SaveArticle(ctx, article)
	}); err != nil {
		return nil, err
	}

	return &articleresponse.ArticleStatusResult{ID: id, Status: model.StatusArchived}, nil
}
