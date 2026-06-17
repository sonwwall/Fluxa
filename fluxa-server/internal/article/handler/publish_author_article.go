package handler

import (
	"context"

	articlerequest "fluxa-server/internal/article/request"
	"fluxa-server/internal/response"

	"github.com/cloudwego/hertz/pkg/app"
)

func (h *Handler) PublishAuthorArticle(ctx context.Context, c *app.RequestContext) {
	payload, err := articlerequest.ParsePublishArticleRequest(c)
	if err != nil {
		response.Fail(c, err)
		return
	}

	data, err := h.service.PublishAuthorArticle(ctx, c.Param("id"), payload)
	if err != nil {
		response.Fail(c, err)
		return
	}
	response.Success(c, data)
}
