package main

import (
	"context"
	"log"

	"fluxa-server/internal/config"
	"fluxa-server/internal/database"
	fluxalogger "fluxa-server/internal/logger"
	"fluxa-server/internal/router"

	"github.com/cloudwego/hertz/pkg/app/server"
	"go.uber.org/zap"
)

func main() {
	cfg, err := config.Load("configs/config.yaml")
	if err != nil {
		log.Fatalf("load config: %v", err)
	}

	logger, err := fluxalogger.New(cfg.Log)
	if err != nil {
		log.Fatalf("init logger: %v", err)
	}
	defer func() {
		_ = logger.Sync()
	}()

	db, err := database.NewMySQL(context.Background(), cfg.Database, logger)
	if err != nil {
		logger.Fatal("init mysql failed", zap.Error(err))
	}

	h := server.Default(server.WithHostPorts(cfg.Server.Addr()))
	router.Register(h, router.Dependencies{
		Config: cfg,
		DB:     db,
		Logger: logger,
	})

	logger.Info("server starting",
		zap.String("addr", cfg.Server.Addr()),
		zap.String("environment", cfg.Server.Environment),
	)
	h.Spin()
}
