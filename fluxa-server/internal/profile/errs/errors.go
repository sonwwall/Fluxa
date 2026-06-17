package errs

import apperrs "fluxa-server/internal/errs"

var ErrProfileNotFound = apperrs.New(533001, "作者资料不存在")
