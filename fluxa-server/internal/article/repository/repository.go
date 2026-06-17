package repository

import (
	"context"

	"fluxa-server/internal/article/model"

	"gorm.io/gorm"
)

type ListOptions struct {
	Page         int
	PageSize     int
	CategorySlug string
	Tag          string
}

type Repository struct {
	db *gorm.DB
}

func New(db *gorm.DB) *Repository {
	return &Repository{db: db}
}

func (r *Repository) publicQuery(ctx context.Context) *gorm.DB {
	return r.db.WithContext(ctx).
		Model(&model.Article{}).
		Joins("JOIN categories ON categories.id = articles.category_id").
		Where("articles.status = ?", model.StatusPublished).
		Where("articles.deleted_at IS NULL").
		Where("(articles.visibility = ? OR (articles.visibility = ? AND categories.visibility = ?))",
			model.VisibilityPublic,
			model.VisibilityInherit,
			model.VisibilityPublic,
		)
}
