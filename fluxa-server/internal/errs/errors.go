package errs

import "errors"

type AppError struct {
	Code  int
	Msg   string
	Cause error
}

func New(code int, msg string) *AppError {
	return &AppError{Code: code, Msg: msg}
}

func Wrap(code int, msg string, cause error) *AppError {
	return &AppError{Code: code, Msg: msg, Cause: cause}
}

func (e *AppError) Error() string {
	if e.Cause != nil {
		return e.Cause.Error()
	}
	return e.Msg
}

func (e *AppError) Unwrap() error {
	return e.Cause
}

func FromError(err error) (*AppError, bool) {
	var appErr *AppError
	if errors.As(err, &appErr) {
		return appErr, true
	}
	return nil, false
}

var (
	ErrInternal     = New(9001, "系统异常，请稍后重试")
	ErrUnauthorized = New(11001, "请先登录")
	ErrForbidden    = New(12001, "无权限访问")
)
