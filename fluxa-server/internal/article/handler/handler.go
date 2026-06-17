package handler

import (
	"context"
	"strconv"

	articlerequest "fluxa-server/internal/article/request"
	"fluxa-server/internal/article/service"
	"fluxa-server/internal/response"

	"github.com/cloudwego/hertz/pkg/app"
)

type Handler struct {
	service *service.Service
}

func New(service *service.Service) *Handler {
	return &Handler{service: service}
}

func (h *Handler) Home(ctx context.Context, c *app.RequestContext) {
	data, err := h.service.HomeData(ctx)
	if err != nil {
		response.Fail(c, err)
		return
	}
	response.Success(c, data)
}

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

func (h *Handler) Detail(ctx context.Context, c *app.RequestContext) {
	slug := c.Param("slug")
	data, err := h.service.GetPublicArticle(ctx, slug)
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
