package handler

import (
	"context"

	"fluxa-server/internal/response"

	"github.com/cloudwego/hertz/pkg/app"
)

func (h *Handler) DeleteAuthorArticle(ctx context.Context, c *app.RequestContext) {
	if err := h.service.DeleteAuthorArticle(ctx, c.Param("id")); err != nil {
		response.Fail(c, err)
		return
	}
	response.Success(c, nil)
}
