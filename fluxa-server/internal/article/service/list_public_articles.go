package service

import (
	"context"

	"fluxa-server/internal/article/repository"
	articlerequest "fluxa-server/internal/article/request"
	articleresponse "fluxa-server/internal/article/response"
	sharedresponse "fluxa-server/internal/response"
)

func (s *Service) ListPublicArticles(ctx context.Context, query *articlerequest.ListArticlesQuery) (*sharedresponse.Page[articleresponse.ArticleSummary], error) {
	articles, total, err := s.repository.ListPublic(ctx, repository.ListOptions{
		Page:         query.Page,
		PageSize:     query.PageSize,
		CategorySlug: query.CategorySlug,
		Tag:          query.Tag,
	})
	if err != nil {
		return nil, err
	}

	return &sharedresponse.Page[articleresponse.ArticleSummary]{
		List:     toSummaries(articles),
		Page:     query.Page,
		PageSize: query.PageSize,
		Total:    total,
	}, nil
}
