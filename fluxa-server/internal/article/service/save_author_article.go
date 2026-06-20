package service

import (
	"context"
	"encoding/json"
	"regexp"
	"strconv"
	"strings"
	"time"

	articleerrs "fluxa-server/internal/article/errs"
	"fluxa-server/internal/article/model"
	"fluxa-server/internal/article/repository"
	articlerequest "fluxa-server/internal/article/request"
	articleresponse "fluxa-server/internal/article/response"
)

var slugCleanupPattern = regexp.MustCompile(`[^a-z0-9]+`)

func (s *Service) CreateAuthorArticle(ctx context.Context, payload *articlerequest.SaveAuthorArticleRequest) (*articleresponse.SavedArticle, error) {
	if err := s.validateArticlePayload(ctx, payload); err != nil {
		return nil, err
	}

	now := time.Now().UTC()
	id := "art_" + strconv36(now.UnixNano())
	article := &model.Article{
		ID:          id,
		Slug:        uniqueSlug(payload.Title, id),
		Title:       payload.Title,
		Subtitle:    "",
		Excerpt:     payload.Excerpt,
		Content:     payload.Content,
		CategoryID:  payload.CategoryID,
		Tags:        encodeTags(payload.Tags),
		Status:      model.StatusDraft,
		Visibility:  payload.Visibility,
		ReadTime:    estimateReadTime(payload.Content),
		Views:       "",
		ViewCount:   0,
		CoverAccent: "sky",
		CoverAlt:    payload.Title,
		CreatedAt:   now,
		UpdatedAt:   now,
	}

	if err := s.repository.Transaction(ctx, func(repo *repository.Repository) error {
		return repo.CreateArticle(ctx, article)
	}); err != nil {
		return nil, err
	}

	return &articleresponse.SavedArticle{ID: id}, nil
}

func (s *Service) UpdateAuthorArticle(ctx context.Context, id string, payload *articlerequest.SaveAuthorArticleRequest) (*articleresponse.SavedArticle, error) {
	if err := s.validateArticlePayload(ctx, payload); err != nil {
		return nil, err
	}

	if err := s.repository.Transaction(ctx, func(repo *repository.Repository) error {
		article, err := repo.FindAuthorArticleByID(ctx, id)
		if err != nil {
			return err
		}

		article.Title = payload.Title
		article.Excerpt = payload.Excerpt
		article.Content = payload.Content
		article.CategoryID = payload.CategoryID
		article.Tags = encodeTags(payload.Tags)
		article.Visibility = payload.Visibility
		article.ReadTime = estimateReadTime(payload.Content)
		article.CoverAlt = payload.Title
		article.UpdatedAt = time.Now().UTC()

		return repo.SaveArticle(ctx, article)
	}); err != nil {
		return nil, err
	}

	return &articleresponse.SavedArticle{ID: id}, nil
}

func (s *Service) validateArticlePayload(ctx context.Context, payload *articlerequest.SaveAuthorArticleRequest) error {
	if !validVisibility(payload.Visibility) {
		return articleerrs.ErrInvalidArticleInput
	}

	exists, err := s.repository.CategoryExists(ctx, payload.CategoryID)
	if err != nil {
		return err
	}
	if !exists {
		return articleerrs.ErrInvalidArticleInput
	}
	return nil
}

func validVisibility(value string) bool {
	return value == model.VisibilityInherit || value == model.VisibilityPublic || value == model.VisibilityRegistered
}

func encodeTags(tags []string) string {
	encoded, err := json.Marshal(tags)
	if err != nil {
		return "[]"
	}
	return string(encoded)
}

func uniqueSlug(title string, id string) string {
	base := strings.Trim(slugCleanupPattern.ReplaceAllString(strings.ToLower(title), "-"), "-")
	if base == "" {
		base = "article"
	}
	return base + "-" + strings.TrimPrefix(id, "art_")
}

func estimateReadTime(content string) string {
	words := len(strings.Fields(content))
	minutes := words / 220
	if minutes < 1 {
		minutes = 1
	}
	return strconv.Itoa(minutes) + " min read"
}

func strconv36(value int64) string {
	return strings.ToLower(strconv.FormatInt(value, 36))
}
