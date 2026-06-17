package repository

import (
	"context"
	"errors"

	articleerrs "fluxa-server/internal/article/errs"
	"fluxa-server/internal/article/model"

	"gorm.io/gorm"
)

func (r *Repository) FindAuthorArticleByID(ctx context.Context, id string) (*model.Article, error) {
	var article model.Article
	err := r.authorArticleQuery(ctx).
		Preload("Category").
		Where("articles.id = ?", id).
		First(&article).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, articleerrs.ErrArticleNotFound
		}
		return nil, err
	}
	return &article, nil
}
