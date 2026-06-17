package repository

import (
	"context"

	"fluxa-server/internal/article/model"

	"gorm.io/gorm"
)

type AuthorListOptions struct {
	Page       int
	PageSize   int
	Status     string
	CategoryID string
	Keyword    string
}

type StatusCounts struct {
	Published int64
	Drafts    int64
	Scheduled int64
	Archived  int64
}

func (r *Repository) ListAuthorArticles(ctx context.Context, options AuthorListOptions) ([]model.Article, int64, error) {
	query := r.authorArticleQuery(ctx)
	if options.Status != "" {
		query = query.Where("articles.status = ?", options.Status)
	}
	if options.CategoryID != "" {
		query = query.Where("articles.category_id = ?", options.CategoryID)
	}
	if options.Keyword != "" {
		like := "%" + options.Keyword + "%"
		query = query.Where("(articles.title LIKE ? OR articles.excerpt LIKE ?)", like, like)
	}

	var total int64
	if err := query.Model(&model.Article{}).Count(&total).Error; err != nil {
		return nil, 0, err
	}

	var articles []model.Article
	offset := (options.Page - 1) * options.PageSize
	err := query.
		Preload("Category").
		Order("articles.updated_at DESC").
		Limit(options.PageSize).
		Offset(offset).
		Find(&articles).Error
	if err != nil {
		return nil, 0, err
	}

	return articles, total, nil
}

func (r *Repository) RecentAuthorArticles(ctx context.Context, limit int) ([]model.Article, error) {
	var articles []model.Article
	err := r.authorArticleQuery(ctx).
		Preload("Category").
		Order("articles.updated_at DESC").
		Limit(limit).
		Find(&articles).Error
	return articles, err
}

func (r *Repository) CountAuthorStatuses(ctx context.Context) (StatusCounts, error) {
	count := func(status string) (int64, error) {
		var total int64
		err := r.authorArticleQuery(ctx).Where("articles.status = ?", status).Count(&total).Error
		return total, err
	}

	published, err := count(model.StatusPublished)
	if err != nil {
		return StatusCounts{}, err
	}
	drafts, err := count(model.StatusDraft)
	if err != nil {
		return StatusCounts{}, err
	}
	scheduled, err := count(model.StatusScheduled)
	if err != nil {
		return StatusCounts{}, err
	}
	archived, err := count(model.StatusArchived)
	if err != nil {
		return StatusCounts{}, err
	}

	return StatusCounts{
		Published: published,
		Drafts:    drafts,
		Scheduled: scheduled,
		Archived:  archived,
	}, nil
}

func (r *Repository) CountPublishedThisMonth(ctx context.Context) (int64, error) {
	var total int64
	err := r.authorArticleQuery(ctx).
		Where("articles.status = ?", model.StatusPublished).
		Where("YEAR(articles.published_at) = YEAR(CURRENT_DATE())").
		Where("MONTH(articles.published_at) = MONTH(CURRENT_DATE())").
		Count(&total).Error
	return total, err
}

func (r *Repository) authorArticleQuery(ctx context.Context) *gorm.DB {
	return r.db.WithContext(ctx).
		Model(&model.Article{}).
		Where("articles.deleted_at IS NULL")
}
