package repository

import (
	"context"
	"errors"

	articleerrs "fluxa-server/internal/article/errs"
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

func (r *Repository) PublicTopics(ctx context.Context) ([]string, error) {
	var topics []string
	err := r.db.WithContext(ctx).
		Table("categories").
		Where("visibility = ?", model.VisibilityPublic).
		Order("sort_order ASC").
		Limit(8).
		Pluck("name", &topics).Error
	return topics, err
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
