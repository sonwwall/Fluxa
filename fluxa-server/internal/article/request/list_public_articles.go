package request

import (
	"fmt"
	"strconv"

	articleerrs "fluxa-server/internal/article/errs"

	"github.com/cloudwego/hertz/pkg/app"
)

type ListArticlesQuery struct {
	Page         int
	PageSize     int
	CategorySlug string
	Tag          string
}

func ParseListArticlesQuery(c *app.RequestContext) (*ListArticlesQuery, error) {
	page, err := parsePositiveInt(c.Query("page"), 1)
	if err != nil {
		return nil, articleerrs.ErrInvalidPage
	}
	pageSize, err := parsePositiveInt(c.Query("page_size"), 20)
	if err != nil {
		return nil, articleerrs.ErrInvalidPage
	}
	if pageSize > 50 {
		pageSize = 50
	}

	return &ListArticlesQuery{
		Page:         page,
		PageSize:     pageSize,
		CategorySlug: c.Query("category_slug"),
		Tag:          c.Query("tag"),
	}, nil
}

func parsePositiveInt(value string, fallback int) (int, error) {
	if value == "" {
		return fallback, nil
	}
	parsed, err := strconv.Atoi(value)
	if err != nil || parsed <= 0 {
		return 0, fmt.Errorf("value must be positive")
	}
	return parsed, nil
}
