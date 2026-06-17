package request

import (
	"encoding/json"
	"strings"
	"time"

	articleerrs "fluxa-server/internal/article/errs"

	"github.com/cloudwego/hertz/pkg/app"
)

type AuthorArticlesQuery struct {
	Page       int
	PageSize   int
	Status     string
	CategoryID string
	Keyword    string
}

type SaveAuthorArticleRequest struct {
	Title      string   `json:"title"`
	Excerpt    string   `json:"excerpt"`
	Content    string   `json:"content"`
	CategoryID string   `json:"category_id"`
	Tags       []string `json:"tags"`
	Visibility string   `json:"visibility"`
}

type PublishArticleRequest struct {
	ScheduledAt *time.Time `json:"scheduled_at"`
}

func ParseAuthorArticlesQuery(c *app.RequestContext) (*AuthorArticlesQuery, error) {
	page, err := parsePositiveInt(c.Query("page"), 1)
	if err != nil {
		return nil, articleerrs.ErrInvalidPage
	}
	pageSize, err := parsePositiveInt(c.Query("page_size"), 20)
	if err != nil {
		return nil, articleerrs.ErrInvalidPage
	}
	if pageSize > 100 {
		pageSize = 100
	}

	return &AuthorArticlesQuery{
		Page:       page,
		PageSize:   pageSize,
		Status:     strings.TrimSpace(c.Query("status")),
		CategoryID: strings.TrimSpace(c.Query("category_id")),
		Keyword:    strings.TrimSpace(c.Query("keyword")),
	}, nil
}

func ParseSaveAuthorArticleRequest(c *app.RequestContext) (*SaveAuthorArticleRequest, error) {
	var payload SaveAuthorArticleRequest
	if err := json.Unmarshal(c.Request.Body(), &payload); err != nil {
		return nil, articleerrs.ErrInvalidArticleInput
	}

	payload.Title = strings.TrimSpace(payload.Title)
	payload.Excerpt = strings.TrimSpace(payload.Excerpt)
	payload.CategoryID = strings.TrimSpace(payload.CategoryID)
	payload.Visibility = strings.TrimSpace(payload.Visibility)
	payload.Tags = normalizeTags(payload.Tags)

	if payload.Title == "" || payload.Excerpt == "" || strings.TrimSpace(payload.Content) == "" || payload.CategoryID == "" {
		return nil, articleerrs.ErrInvalidArticleInput
	}

	return &payload, nil
}

func ParsePublishArticleRequest(c *app.RequestContext) (*PublishArticleRequest, error) {
	if len(c.Request.Body()) == 0 {
		return &PublishArticleRequest{}, nil
	}

	var payload PublishArticleRequest
	if err := json.Unmarshal(c.Request.Body(), &payload); err != nil {
		return nil, articleerrs.ErrInvalidArticleInput
	}
	return &payload, nil
}

func normalizeTags(tags []string) []string {
	seen := make(map[string]struct{}, len(tags))
	normalized := make([]string, 0, len(tags))
	for _, tag := range tags {
		value := strings.TrimSpace(tag)
		if value == "" {
			continue
		}
		if _, ok := seen[value]; ok {
			continue
		}
		seen[value] = struct{}{}
		normalized = append(normalized, value)
	}
	return normalized
}
