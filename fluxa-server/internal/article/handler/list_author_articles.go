package handler

import (
	"context"

	articlerequest "fluxa-server/internal/article/request"
	"fluxa-server/internal/response"

	"github.com/cloudwego/hertz/pkg/app"
)

func (h *Handler) ListAuthorArticles(ctx context.Context, c *app.RequestContext) {
	query, err := articlerequest.ParseAuthorArticlesQuery(c)
	if err != nil {
		response.Fail(c, err)
		return
	}

	data, err := h.service.ListAuthorArticles(ctx, query)
	if err != nil {
		response.Fail(c, err)
		return
	}
	response.Success(c, data)
}

func (h *Handler) ListAuthorCategories(ctx context.Context, c *app.RequestContext) {
	data, err := h.service.ListAuthorCategories(ctx)
	if err != nil {
		response.Fail(c, err)
		return
	}
	response.Success(c, data)
}
