package errs

import apperrs "fluxa-server/internal/errs"

var (
	ErrArticleNotFound = apperrs.New(333001, "文章不存在")
	ErrInvalidPage     = apperrs.New(311001, "分页参数不合法")
)
