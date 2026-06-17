package middleware

import (
	"context"
	"strings"

	"fluxa-server/internal/auth"
	"fluxa-server/internal/errs"
	"fluxa-server/internal/response"

	"github.com/cloudwego/hertz/pkg/app"
)

const CurrentUserKey = "current_user"

func AuthorOnly(manager *auth.JWTManager) app.HandlerFunc {
	return func(ctx context.Context, c *app.RequestContext) {
		token := bearerToken(c)
		if token == "" {
			response.Fail(c, errs.ErrUnauthorized)
			c.Abort()
			return
		}

		claims, err := manager.Parse(token)
		if err != nil {
			response.Fail(c, errs.ErrUnauthorized)
			c.Abort()
			return
		}

		if claims.Role != auth.RoleAuthor {
			response.Fail(c, errs.ErrForbidden)
			c.Abort()
			return
		}

		c.Set(CurrentUserKey, claims)
		c.Next(ctx)
	}
}

func bearerToken(c *app.RequestContext) string {
	header := string(c.Request.Header.Peek("Authorization"))
	if strings.HasPrefix(header, "Bearer ") {
		return strings.TrimPrefix(header, "Bearer ")
	}

	cookie := c.Cookie("fluxa_token")
	if len(cookie) > 0 {
		return string(cookie)
	}

	return ""
}
