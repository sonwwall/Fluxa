package repository

import (
	"context"

	"fluxa-server/internal/article/model"
)

func (r *Repository) CreateArticle(ctx context.Context, article *model.Article) error {
	return r.db.WithContext(ctx).Create(article).Error
}

func (r *Repository) SaveArticle(ctx context.Context, article *model.Article) error {
	return r.db.WithContext(ctx).Save(article).Error
}

func (r *Repository) DeleteArticle(ctx context.Context, article *model.Article) error {
	return r.db.WithContext(ctx).Delete(article).Error
}
