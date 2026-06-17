package router

import (
	"context"
	"database/sql"

	"fluxa-server/internal/config"
	"fluxa-server/internal/middleware"
	"fluxa-server/internal/response"

	"github.com/cloudwego/hertz/pkg/app"
	"github.com/cloudwego/hertz/pkg/app/server"
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
