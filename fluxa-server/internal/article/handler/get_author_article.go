package handler

import (
	"context"

	"fluxa-server/internal/response"

	"github.com/cloudwego/hertz/pkg/app"
)

func (h *Handler) NewAuthorArticleDraft(ctx context.Context, c *app.RequestContext) {
	data, err := h.service.GetNewAuthorArticleDraft(ctx)
	if err != nil {
		response.Fail(c, err)
		return
	}
	response.Success(c, data)
}

func (h *Handler) AuthorArticleDraft(ctx context.Context, c *app.RequestContext) {
	data, err := h.service.GetAuthorArticleDraft(ctx, c.Param("id"))
	if err != nil {
		response.Fail(c, err)
		return
	}
	response.Success(c, data)
}
