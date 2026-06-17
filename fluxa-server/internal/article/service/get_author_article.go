package service

import (
	"context"

	articleresponse "fluxa-server/internal/article/response"
)

func (s *Service) GetNewAuthorArticleDraft(ctx context.Context) (*articleresponse.AuthorDraftPageData, error) {
	categories, err := s.repository.ListAuthorCategories(ctx)
	if err != nil {
		return nil, err
	}

	return &articleresponse.AuthorDraftPageData{
		Draft:      newAuthorDraft(categories),
		Categories: toAuthorCategories(categories),
	}, nil
}

func (s *Service) GetAuthorArticleDraft(ctx context.Context, id string) (*articleresponse.AuthorDraftPageData, error) {
	article, err := s.repository.FindAuthorArticleByID(ctx, id)
	if err != nil {
		return nil, err
	}

	categories, err := s.repository.ListAuthorCategories(ctx)
	if err != nil {
		return nil, err
	}

	return &articleresponse.AuthorDraftPageData{
		Draft:      toAuthorDraft(*article),
		Categories: toAuthorCategories(categories),
	}, nil
}
