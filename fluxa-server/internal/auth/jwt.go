package auth

import (
	"fmt"
	"time"

	"fluxa-server/internal/config"

	"github.com/golang-jwt/jwt/v5"
)

const (
	RoleAuthor = "author"
	RoleUser   = "user"
)

type Claims struct {
	UserID string `json:"user_id"`
	Role   string `json:"role"`
	jwt.RegisteredClaims
}

type JWTManager struct {
	expiresIn time.Duration
	issuer    string
	secret    []byte
}

func NewJWTManager(cfg config.JWTConfig) *JWTManager {
	return &JWTManager{
		expiresIn: time.Duration(cfg.ExpiresInSeconds) * time.Second,
		issuer:    cfg.Issuer,
		secret:    []byte(cfg.Secret),
	}
}

func (m *JWTManager) Generate(userID string, role string) (string, error) {
	now := time.Now()
	claims := Claims{
		UserID: userID,
		Role:   role,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(now.Add(m.expiresIn)),
			IssuedAt:  jwt.NewNumericDate(now),
			Issuer:    m.issuer,
			Subject:   userID,
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(m.secret)
}

func (m *JWTManager) Parse(tokenValue string) (*Claims, error) {
	token, err := jwt.ParseWithClaims(tokenValue, &Claims{}, func(token *jwt.Token) (any, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method")
		}
		return m.secret, nil
	})
	if err != nil {
		return nil, err
	}

	claims, ok := token.Claims.(*Claims)
	if !ok || !token.Valid {
		return nil, fmt.Errorf("invalid token")
	}

	return claims, nil
}
