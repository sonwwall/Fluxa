package service

import (
	"context"
	"encoding/json"

	"fluxa-server/internal/profile/model"
	profileresponse "fluxa-server/internal/profile/response"
)

func (s *Service) GetPublicProfile(ctx context.Context) (*profileresponse.Profile, error) {
	profile, err := s.repository.FindPublicProfile(ctx)
	if err != nil {
		return nil, err
	}
	return toResponse(profile)
}

func toResponse(profile *model.Profile) (*profileresponse.Profile, error) {
	var links []profileresponse.ProfileLink
	var now []profileresponse.NowItem
	var skills []profileresponse.SkillGroup
	var journey []profileresponse.JourneyItem
	var principles []profileresponse.Principle

	if err := decodeJSON(profile.Links, &links); err != nil {
		return nil, err
	}
	if err := decodeJSON(profile.NowItems, &now); err != nil {
		return nil, err
	}
	if err := decodeJSON(profile.Skills, &skills); err != nil {
		return nil, err
	}
	if err := decodeJSON(profile.Journey, &journey); err != nil {
		return nil, err
	}
	if err := decodeJSON(profile.Principles, &principles); err != nil {
		return nil, err
	}

	return &profileresponse.Profile{
		DisplayName: profile.DisplayName,
		Headline:    profile.Headline,
		Bio:         profile.Bio,
		Location:    profile.Location,
		Links:       links,
		Now:         now,
		Skills:      skills,
		Journey:     journey,
		Principles:  principles,
	}, nil
}

func decodeJSON[T any](value string, target *T) error {
	return json.Unmarshal([]byte(value), target)
}
