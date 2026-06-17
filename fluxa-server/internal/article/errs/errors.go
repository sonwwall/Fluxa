package errs

import apperrs "fluxa-server/internal/errs"

var (
	ErrArticleNotFound      = apperrs.New(333001, "文章不存在")
	ErrInvalidPage          = apperrs.New(311001, "分页参数不合法")
	ErrInvalidArticleInput  = apperrs.New(311002, "文章参数不合法")
	ErrInvalidArticleStatus = apperrs.New(312001, "当前文章状态不允许执行该操作")
)
