package middleware

import (
	"context"

	"github.com/cloudwego/hertz/pkg/app"
	"github.com/cloudwego/hertz/pkg/protocol/consts"
)

func CORS() app.HandlerFunc {
	return func(ctx context.Context, c *app.RequestContext) {
		origin := string(c.Request.Header.Peek("Origin"))
		if origin != "" {
			c.Response.Header.Set("Access-Control-Allow-Origin", origin)
			c.Response.Header.Set("Vary", "Origin")
		}
		c.Response.Header.Set("Access-Control-Allow-Credentials", "true")
		c.Response.Header.Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		c.Response.Header.Set("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")

		if string(c.Method()) == consts.MethodOptions {
			c.Status(consts.StatusNoContent)
			c.Abort()
			return
		}

		c.Next(ctx)
	}
}
