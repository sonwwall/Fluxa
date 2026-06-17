package response

import (
	"net/http"

	"fluxa-server/internal/errs"

	"github.com/cloudwego/hertz/pkg/app"
)

const successMessage = "success"

type Body struct {
	Code int    `json:"code"`
	Data any    `json:"data"`
	Msg  string `json:"msg"`
}

type Page[T any] struct {
	List     []T   `json:"list"`
	Page     int   `json:"page"`
	PageSize int   `json:"page_size"`
	Total    int64 `json:"total"`
}

func Success(c *app.RequestContext, data any) {
	c.JSON(http.StatusOK, Body{
		Code: 0,
		Data: data,
		Msg:  successMessage,
	})
}

func Fail(c *app.RequestContext, err error) {
	appErr, ok := errs.FromError(err)
	if !ok {
		appErr = errs.ErrInternal
	}

	c.JSON(statusCode(appErr), Body{
		Code: appErr.Code,
		Data: nil,
		Msg:  appErr.Msg,
	})
}

func statusCode(err *errs.AppError) int {
	switch err.Code {
	case errs.ErrUnauthorized.Code:
		return http.StatusUnauthorized
	case errs.ErrForbidden.Code:
		return http.StatusForbidden
	default:
		return http.StatusOK
	}
}
