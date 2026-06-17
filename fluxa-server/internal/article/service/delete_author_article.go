package service

import (
	"context"

	"fluxa-server/internal/article/repository"
)

func (s *Service) DeleteAuthorArticle(ctx context.Context, id string) error {
	return s.repository.Transaction(ctx, func(repo *repository.Repository) error {
		article, err := repo.FindAuthorArticleByID(ctx, id)
		if err != nil {
			return err
		}
		return repo.DeleteArticle(ctx, article)
	})
}
