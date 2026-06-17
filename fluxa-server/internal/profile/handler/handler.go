package handler

import (
	"context"

	"fluxa-server/internal/profile/service"
	"fluxa-server/internal/response"

	"github.com/cloudwego/hertz/pkg/app"
)

type Handler struct {
	service *service.Service
}

func New(service *service.Service) *Handler {
	return &Handler{service: service}
}

func (h *Handler) GetPublicProfile(ctx context.Context, c *app.RequestContext) {
	profile, err := h.service.GetPublicProfile(ctx)
	if err != nil {
		response.Fail(c, err)
		return
	}
	response.Success(c, profile)
}
