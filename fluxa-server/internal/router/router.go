package router

import (
	"context"
	"database/sql"

	articlehandler "fluxa-server/internal/article/handler"
	articlerepository "fluxa-server/internal/article/repository"
	articleservice "fluxa-server/internal/article/service"
	"fluxa-server/internal/config"
	"fluxa-server/internal/middleware"
	profilehandler "fluxa-server/internal/profile/handler"
	profilerepository "fluxa-server/internal/profile/repository"
	profileservice "fluxa-server/internal/profile/service"
	"fluxa-server/internal/response"

	"github.com/cloudwego/hertz/pkg/app"
	"github.com/cloudwego/hertz/pkg/app/server"
	"github.com/cloudwego/hertz/pkg/route"
	"go.uber.org/zap"
	"gorm.io/gorm"
)

type Dependencies struct {
	Config *config.Config
	DB     *gorm.DB
	Logger *zap.Logger
}

func Register(h *server.Hertz, deps Dependencies) {
	h.Use(middleware.RequestID())
	h.Use(middleware.Recover(deps.Logger))
	h.Use(middleware.RequestLogger(deps.Logger))

	api := h.Group("/api/v1")
	api.GET("/health", healthHandler(deps))

	if deps.DB != nil {
		registerPublicRoutes(api, deps)
	}
}

func registerPublicRoutes(api *route.RouterGroup, deps Dependencies) {
	profileRepository := profilerepository.New(deps.DB)
	profileService := profileservice.New(profileRepository)
	profileHandler := profilehandler.New(profileService)
	api.GET("/profile", profileHandler.GetPublicProfile)

	articleRepository := articlerepository.New(deps.DB)
	articleService := articleservice.New(articleRepository)
	articleHandler := articlehandler.New(articleService)
	api.GET("/articles/home", articleHandler.Home)
	api.GET("/articles", articleHandler.List)
	api.GET("/articles/:slug", articleHandler.Detail)
	api.GET("/articles/:slug/related", articleHandler.Related)
}

func healthHandler(deps Dependencies) app.HandlerFunc {
	return func(ctx context.Context, c *app.RequestContext) {
		data := map[string]any{
			"status":      "ok",
			"environment": deps.Config.Server.Environment,
			"database":    "disabled",
		}

		if deps.DB != nil {
			sqlDB, err := deps.DB.DB()
			if err != nil {
				data["status"] = "degraded"
				data["database"] = "unavailable"
				response.Success(c, data)
				return
			}

			if err := ping(ctx, sqlDB); err != nil {
				data["status"] = "degraded"
				data["database"] = "unavailable"
				response.Success(c, data)
				return
			}
			data["database"] = "ok"
		}

		response.Success(c, data)
	}
}

func ping(ctx context.Context, db *sql.DB) error {
	return db.PingContext(ctx)
}
