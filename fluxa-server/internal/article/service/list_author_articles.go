package service

import (
	"context"

	"fluxa-server/internal/article/repository"
	articlerequest "fluxa-server/internal/article/request"
	articleresponse "fluxa-server/internal/article/response"
)

func (s *Service) ListAuthorArticles(ctx context.Context, query *articlerequest.AuthorArticlesQuery) (*articleresponse.AuthorArticlesData, error) {
	articles, total, err := s.repository.ListAuthorArticles(ctx, repository.AuthorListOptions{
		Page:       query.Page,
		PageSize:   query.PageSize,
		Status:     query.Status,
		CategoryID: query.CategoryID,
		Keyword:    query.Keyword,
	})
	if err != nil {
		return nil, err
	}

	counts, err := s.repository.CountAuthorStatuses(ctx)
	if err != nil {
		return nil, err
	}

	categories, err := s.repository.ListAuthorCategories(ctx)
	if err != nil {
		return nil, err
	}

	return &articleresponse.AuthorArticlesData{
		List:       toAuthorRows(articles),
		Page:       query.Page,
		PageSize:   query.PageSize,
		Total:      total,
		Overview:   toAuthorOverview(counts),
		Categories: toAuthorCategories(categories),
	}, nil
}

func (s *Service) ListAuthorCategories(ctx context.Context) ([]articleresponse.AuthorCategory, error) {
	categories, err := s.repository.ListAuthorCategories(ctx)
	if err != nil {
		return nil, err
	}
	return toAuthorCategories(categories), nil
}
