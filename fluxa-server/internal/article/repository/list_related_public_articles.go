package repository

import (
	"context"

	"fluxa-server/internal/article/model"

	"gorm.io/gorm"
)

func (r *Repository) RelatedPublic(ctx context.Context, article *model.Article, limit int) ([]model.Article, error) {
	var articles []model.Article
	err := r.publicQuery(ctx).
		Preload("Category").
		Where("articles.id <> ?", article.ID).
		Order(gorm.Expr("articles.category_id = ? DESC", article.CategoryID)).
		Order("articles.view_count DESC").
		Order("articles.published_at DESC").
		Limit(limit).
		Find(&articles).Error
	return articles, err
}
