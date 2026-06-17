package repository

import (
	"context"

	categorymodel "fluxa-server/internal/category/model"
)

func (r *Repository) ListAuthorCategories(ctx context.Context) ([]categorymodel.Category, error) {
	var categories []categorymodel.Category
	err := r.db.WithContext(ctx).
		Order("sort_order ASC").
		Order("name ASC").
		Find(&categories).Error
	return categories, err
}

func (r *Repository) CategoryExists(ctx context.Context, id string) (bool, error) {
	var total int64
	err := r.db.WithContext(ctx).
		Model(&categorymodel.Category{}).
		Where("id = ?", id).
		Count(&total).Error
	return total > 0, err
}
