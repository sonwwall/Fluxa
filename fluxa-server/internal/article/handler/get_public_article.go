package handler

import (
	"context"
	"strconv"

	"fluxa-server/internal/response"

	"github.com/cloudwego/hertz/pkg/app"
)

func (h *Handler) Detail(ctx context.Context, c *app.RequestContext) {
	data, err := h.service.GetPublicArticle(ctx, c.Param("slug"))
	if err != nil {
		response.Fail(c, err)
		return
	}
	response.Success(c, data)
}

func (h *Handler) Related(ctx context.Context, c *app.RequestContext) {
	limit := 3
	if raw := c.Query("limit"); raw != "" {
		parsed, err := strconv.Atoi(raw)
		if err == nil {
			limit = parsed
		}
	}

	data, err := h.service.RelatedPublicArticles(ctx, c.Param("slug"), limit)
	if err != nil {
		response.Fail(c, err)
		return
	}
	response.Success(c, data)
}
