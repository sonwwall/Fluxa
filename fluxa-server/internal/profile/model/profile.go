package model

import "time"

type Profile struct {
	ID          uint64    `gorm:"primaryKey;autoIncrement"`
	DisplayName string    `gorm:"size:100;not null"`
	Headline    string    `gorm:"size:255;not null"`
	Bio         string    `gorm:"type:text;not null"`
	Location    string    `gorm:"size:120;not null"`
	Links       string    `gorm:"type:json;not null"`
	NowItems    string    `gorm:"column:now_items;type:json;not null"`
	Skills      string    `gorm:"type:json;not null"`
	Journey     string    `gorm:"type:json;not null"`
	Principles  string    `gorm:"type:json;not null"`
	CreatedAt   time.Time `gorm:"not null"`
	UpdatedAt   time.Time `gorm:"not null"`
}

func (Profile) TableName() string {
	return "profiles"
}
