package config

import (
	"fmt"
	"strings"
	"time"

	"github.com/spf13/viper"
)

type Config struct {
	Server   ServerConfig   `mapstructure:"server"`
	Database DatabaseConfig `mapstructure:"database"`
	Log      LogConfig      `mapstructure:"log"`
	JWT      JWTConfig      `mapstructure:"jwt"`
}

type ServerConfig struct {
	Host        string `mapstructure:"host"`
	Port        int    `mapstructure:"port"`
	Environment string `mapstructure:"environment"`
}

type DatabaseConfig struct {
	Enabled                      bool   `mapstructure:"enabled"`
	Host                         string `mapstructure:"host"`
	Port                         int    `mapstructure:"port"`
	Username                     string `mapstructure:"username"`
	Password                     string `mapstructure:"password"`
	Database                     string `mapstructure:"database"`
	MaxIdleConnections           int    `mapstructure:"max_idle_connections"`
	MaxOpenConnections           int    `mapstructure:"max_open_connections"`
	ConnectionMaxLifetimeSeconds int    `mapstructure:"connection_max_lifetime_seconds"`
}

type LogConfig struct {
	Level    string `mapstructure:"level"`
	Encoding string `mapstructure:"encoding"`
}

type JWTConfig struct {
	Issuer           string `mapstructure:"issuer"`
	Secret           string `mapstructure:"secret"`
	ExpiresInSeconds int64  `mapstructure:"expires_in_seconds"`
}

func Load(path string) (*Config, error) {
	v := viper.New()
	v.SetConfigFile(path)
	v.SetConfigType("yaml")
	v.SetEnvPrefix("fluxa")
	v.SetEnvKeyReplacer(strings.NewReplacer(".", "_"))
	v.AutomaticEnv()

	setDefaults(v)

	if err := v.ReadInConfig(); err != nil {
		return nil, fmt.Errorf("read config: %w", err)
	}

	var cfg Config
	if err := v.Unmarshal(&cfg); err != nil {
		return nil, fmt.Errorf("unmarshal config: %w", err)
	}

	if err := cfg.Validate(); err != nil {
		return nil, err
	}

	return &cfg, nil
}

func setDefaults(v *viper.Viper) {
	v.SetDefault("server.host", "0.0.0.0")
	v.SetDefault("server.port", 8080)
	v.SetDefault("server.environment", "development")
	v.SetDefault("database.enabled", true)
	v.SetDefault("database.max_idle_connections", 10)
	v.SetDefault("database.max_open_connections", 50)
	v.SetDefault("database.connection_max_lifetime_seconds", 3600)
	v.SetDefault("log.level", "info")
	v.SetDefault("log.encoding", "console")
	v.SetDefault("jwt.issuer", "fluxa")
	v.SetDefault("jwt.expires_in_seconds", int64(24*time.Hour/time.Second))
}

func (c Config) Validate() error {
	if c.Server.Port <= 0 {
		return fmt.Errorf("server.port must be positive")
	}
	if c.Database.Enabled {
		if c.Database.Host == "" {
			return fmt.Errorf("database.host is required")
		}
		if c.Database.Port <= 0 {
			return fmt.Errorf("database.port must be positive")
		}
		if c.Database.Username == "" {
			return fmt.Errorf("database.username is required")
		}
		if c.Database.Database == "" {
			return fmt.Errorf("database.database is required")
		}
	}
	if c.JWT.Secret == "" || c.JWT.Secret == "change-me-in-env" {
		return fmt.Errorf("jwt.secret must be set with a non-default value")
	}
	return nil
}

func (c ServerConfig) Addr() string {
	return fmt.Sprintf("%s:%d", c.Host, c.Port)
}

func (c DatabaseConfig) MaxLifetime() time.Duration {
	return time.Duration(c.ConnectionMaxLifetimeSeconds) * time.Second
}
