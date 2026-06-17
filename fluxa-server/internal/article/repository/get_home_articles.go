package repository

import (
	"context"
	"errors"

	articleerrs "fluxa-server/internal/article/errs"
	"fluxa-server/internal/article/model"

	"gorm.io/gorm"
)

func (r *Repository) FeaturedPublic(ctx context.Context) (*model.Article, error) {
	var article model.Article
	err := r.publicQuery(ctx).
		Preload("Category").
		Where("articles.is_featured = ?", true).
		Order("articles.published_at DESC").
		First(&article).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, articleerrs.ErrArticleNotFound
		}
		return nil, err
	}
	return &article, nil
}

func (r *Repository) LatestPublic(ctx context.Context, limit int) ([]model.Article, error) {
	var articles []model.Article
	err := r.publicQuery(ctx).
		Preload("Category").
		Order("articles.published_at DESC").
		Limit(limit).
		Find(&articles).Error
	return articles, err
}

func (r *Repository) PopularPublic(ctx context.Context, limit int) ([]model.Article, error) {
	var articles []model.Article
	err := r.publicQuery(ctx).
		Preload("Category").
		Order("articles.view_count DESC").
		Order("articles.published_at DESC").
		Limit(limit).
		Find(&articles).Error
	return articles, err
}
