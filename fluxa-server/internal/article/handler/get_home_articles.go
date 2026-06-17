package handler

import (
	"context"

	"fluxa-server/internal/response"

	"github.com/cloudwego/hertz/pkg/app"
)

func (h *Handler) Home(ctx context.Context, c *app.RequestContext) {
	data, err := h.service.HomeData(ctx)
	if err != nil {
		response.Fail(c, err)
		return
	}
	response.Success(c, data)
}
