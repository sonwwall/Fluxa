package middleware

import (
	"context"

	"fluxa-server/internal/errs"
	"fluxa-server/internal/response"

	"github.com/cloudwego/hertz/pkg/app"
	"go.uber.org/zap"
)

func Recover(log *zap.Logger) app.HandlerFunc {
	return func(ctx context.Context, c *app.RequestContext) {
		defer func() {
			if recovered := recover(); recovered != nil {
				log.Error("panic recovered",
					zap.String("request_id", requestID(c)),
					zap.Any("panic", recovered),
				)
				response.Fail(c, errs.ErrInternal)
				c.Abort()
			}
		}()

		c.Next(ctx)
	}
}
