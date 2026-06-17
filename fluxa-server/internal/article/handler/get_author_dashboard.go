package handler

import (
	"context"

	"fluxa-server/internal/response"

	"github.com/cloudwego/hertz/pkg/app"
)

func (h *Handler) AuthorDashboard(ctx context.Context, c *app.RequestContext) {
	data, err := h.service.GetAuthorDashboard(ctx)
	if err != nil {
		response.Fail(c, err)
		return
	}
	response.Success(c, data)
}
