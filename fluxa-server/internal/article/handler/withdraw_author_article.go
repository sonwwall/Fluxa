package handler

import (
	"context"

	"fluxa-server/internal/response"

	"github.com/cloudwego/hertz/pkg/app"
)

func (h *Handler) WithdrawAuthorArticle(ctx context.Context, c *app.RequestContext) {
	data, err := h.service.WithdrawAuthorArticle(ctx, c.Param("id"))
	if err != nil {
		response.Fail(c, err)
		return
	}
	response.Success(c, data)
}
