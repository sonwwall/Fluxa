package service

import (
	"context"

	articleresponse "fluxa-server/internal/article/response"
)

func (s *Service) GetPublicArticle(ctx context.Context, slug string) (*articleresponse.ArticleDetail, error) {
	article, err := s.repository.FindPublicBySlug(ctx, slug)
	if err != nil {
		return nil, err
	}
	return toDetail(*article), nil
}

func (s *Service) RelatedPublicArticles(ctx context.Context, slug string, limit int) ([]articleresponse.ArticleSummary, error) {
	if limit <= 0 || limit > 10 {
		limit = 3
	}

	article, err := s.repository.FindPublicBySlug(ctx, slug)
	if err != nil {
		return nil, err
	}
	related, err := s.repository.RelatedPublic(ctx, article, limit)
	if err != nil {
		return nil, err
	}
	return toSummaries(related), nil
}
