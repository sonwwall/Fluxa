package repository

import (
	"context"

	"fluxa-server/internal/article/model"
)

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
