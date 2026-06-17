package handler

import (
	"context"

	articlerequest "fluxa-server/internal/article/request"
	"fluxa-server/internal/response"

	"github.com/cloudwego/hertz/pkg/app"
)

func (h *Handler) CreateAuthorArticle(ctx context.Context, c *app.RequestContext) {
	payload, err := articlerequest.ParseSaveAuthorArticleRequest(c)
	if err != nil {
		response.Fail(c, err)
		return
	}

	data, err := h.service.CreateAuthorArticle(ctx, payload)
	if err != nil {
		response.Fail(c, err)
		return
	}
	response.Success(c, data)
}

func (h *Handler) UpdateAuthorArticle(ctx context.Context, c *app.RequestContext) {
	payload, err := articlerequest.ParseSaveAuthorArticleRequest(c)
	if err != nil {
		response.Fail(c, err)
		return
	}

	data, err := h.service.UpdateAuthorArticle(ctx, c.Param("id"), payload)
	if err != nil {
		response.Fail(c, err)
		return
	}
	response.Success(c, data)
}
