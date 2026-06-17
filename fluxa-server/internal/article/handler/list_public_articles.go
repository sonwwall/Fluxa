package handler

import (
	"context"

	articlerequest "fluxa-server/internal/article/request"
	"fluxa-server/internal/response"

	"github.com/cloudwego/hertz/pkg/app"
)

func (h *Handler) List(ctx context.Context, c *app.RequestContext) {
	query, err := articlerequest.ParseListArticlesQuery(c)
	if err != nil {
		response.Fail(c, err)
		return
	}

	data, err := h.service.ListPublicArticles(ctx, query)
	if err != nil {
		response.Fail(c, err)
		return
	}
	response.Success(c, data)
}
