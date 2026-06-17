package repository

import (
	"context"

	"fluxa-server/internal/article/model"
)

func (r *Repository) ListPublic(ctx context.Context, options ListOptions) ([]model.Article, int64, error) {
	query := r.publicQuery(ctx)
	if options.CategorySlug != "" {
		query = query.Where("categories.slug = ?", options.CategorySlug)
	}
	if options.Tag != "" {
		query = query.Where("JSON_CONTAINS(articles.tags, JSON_QUOTE(?))", options.Tag)
	}

	var total int64
	if err := query.Model(&model.Article{}).Count(&total).Error; err != nil {
		return nil, 0, err
	}

	var articles []model.Article
	offset := (options.Page - 1) * options.PageSize
	err := query.
		Preload("Category").
		Order("articles.published_at DESC").
		Limit(options.PageSize).
		Offset(offset).
		Find(&articles).Error
	if err != nil {
		return nil, 0, err
	}

	return articles, total, nil
}
