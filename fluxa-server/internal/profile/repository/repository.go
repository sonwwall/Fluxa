package repository

import (
	"context"
	"errors"

	profileerrs "fluxa-server/internal/profile/errs"
	"fluxa-server/internal/profile/model"

	"gorm.io/gorm"
)

type Repository struct {
	db *gorm.DB
}

func New(db *gorm.DB) *Repository {
	return &Repository{db: db}
}

func (r *Repository) FindPublicProfile(ctx context.Context) (*model.Profile, error) {
	var profile model.Profile
	err := r.db.WithContext(ctx).Order("id ASC").First(&profile).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, profileerrs.ErrProfileNotFound
		}
		return nil, err
	}
	return &profile, nil
}
