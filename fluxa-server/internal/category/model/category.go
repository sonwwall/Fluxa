package model

import "time"

type Category struct {
	ID         string    `gorm:"primaryKey;size:64"`
	Slug       string    `gorm:"size:120;uniqueIndex;not null"`
	Name       string    `gorm:"size:120;not null"`
	Visibility string    `gorm:"size:20;not null"`
	SortOrder  int       `gorm:"not null;default:0"`
	CreatedAt  time.Time `gorm:"not null"`
	UpdatedAt  time.Time `gorm:"not null"`
}

func (Category) TableName() string {
	return "categories"
}
