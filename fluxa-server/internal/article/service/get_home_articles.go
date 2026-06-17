package service

import (
	"context"

	articleerrs "fluxa-server/internal/article/errs"
	articleresponse "fluxa-server/internal/article/response"
)

func (s *Service) HomeData(ctx context.Context) (*articleresponse.HomeData, error) {
	latest, err := s.repository.LatestPublic(ctx, 4)
	if err != nil {
		return nil, err
	}
	if len(latest) == 0 {
		return nil, articleerrs.ErrArticleNotFound
	}

	featured, err := s.repository.FeaturedPublic(ctx)
	if err != nil {
		featured = &latest[0]
	}

	popular, err := s.repository.PopularPublic(ctx, 3)
	if err != nil {
		return nil, err
	}
	topics, err := s.repository.PublicTopics(ctx)
	if err != nil {
		return nil, err
	}

	return &articleresponse.HomeData{
		Featured: toSummary(*featured),
		Latest:   toSummaries(latest),
		Popular:  toSummaries(popular),
		Topics:   topics,
	}, nil
}
