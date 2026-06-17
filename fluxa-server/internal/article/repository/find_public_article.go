package repository

import (
	"context"
	"errors"

	articleerrs "fluxa-server/internal/article/errs"
	"fluxa-server/internal/article/model"

	"gorm.io/gorm"
)

func (r *Repository) FindPublicBySlug(ctx context.Context, slug string) (*model.Article, error) {
	var article model.Article
	err := r.publicQuery(ctx).
		Preload("Category").
		Where("articles.slug = ?", slug).
		First(&article).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, articleerrs.ErrArticleNotFound
		}
		return nil, err
	}
	return &article, nil
}
