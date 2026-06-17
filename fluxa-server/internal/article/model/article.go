package model

import (
	"time"

	categorymodel "fluxa-server/internal/category/model"

	"gorm.io/gorm"
)

const (
	StatusPublished = "published"

	VisibilityInherit    = "inherit"
	VisibilityPublic     = "public"
	VisibilityRegistered = "registered"
)

type Article struct {
	ID            string                 `gorm:"primaryKey;size:64"`
	Slug          string                 `gorm:"size:160;uniqueIndex;not null"`
	Title         string                 `gorm:"size:255;not null"`
	Subtitle      string                 `gorm:"size:500;not null"`
	Excerpt       string                 `gorm:"size:800;not null"`
	Content       string                 `gorm:"type:mediumtext;not null"`
	CategoryID    string                 `gorm:"size:64;not null"`
	Category      categorymodel.Category `gorm:"foreignKey:CategoryID"`
	Tags          string                 `gorm:"type:json;not null"`
	Status        string                 `gorm:"size:20;not null"`
	Visibility    string                 `gorm:"size:20;not null"`
	PublishedAt   *time.Time
	ScheduledAt   *time.Time
	ReadTime      string `gorm:"size:60;not null"`
	Views         string `gorm:"size:60;not null"`
	ViewCount     int64  `gorm:"not null;default:0"`
	CoverAccent   string `gorm:"size:20;not null"`
	CoverImageURL *string
	CoverAlt      string `gorm:"size:255;not null"`
	IsFeatured    bool   `gorm:"not null;default:false"`
	CreatedAt     time.Time
	UpdatedAt     time.Time
	DeletedAt     gorm.DeletedAt `gorm:"index"`
}

func (Article) TableName() string {
	return "articles"
}
