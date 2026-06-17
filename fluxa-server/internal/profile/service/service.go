package service

import (
	"fluxa-server/internal/profile/repository"
)

type Service struct {
	repository *repository.Repository
}

func New(repository *repository.Repository) *Service {
	return &Service{repository: repository}
}
