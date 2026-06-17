package service

import (
	"encoding/json"
	"strconv"
	"strings"

	"fluxa-server/internal/article/model"
	articleresponse "fluxa-server/internal/article/response"
)

func toSummaries(articles []model.Article) []articleresponse.ArticleSummary {
	summaries := make([]articleresponse.ArticleSummary, 0, len(articles))
	for _, article := range articles {
		summaries = append(summaries, toSummary(article))
	}
	return summaries
}

func toSummary(article model.Article) articleresponse.ArticleSummary {
	return articleresponse.ArticleSummary{
		ID:      article.ID,
		Slug:    article.Slug,
		Title:   article.Title,
		Excerpt: article.Excerpt,
		Category: articleresponse.Category{
			ID:         article.Category.ID,
			Slug:       article.Category.Slug,
			Name:       article.Category.Name,
			Visibility: article.Category.Visibility,
		},
		Tags:        decodeTags(article.Tags),
		Status:      article.Status,
		Visibility:  effectiveVisibility(article),
		PublishedAt: formatTime(article.PublishedAt),
		ReadTime:    article.ReadTime,
		Cover: articleresponse.Cover{
			Accent:   article.CoverAccent,
			ImageURL: article.CoverImageURL,
			Alt:      article.CoverAlt,
		},
	}
}

func toDetail(article model.Article) *articleresponse.ArticleDetail {
	return &articleresponse.ArticleDetail{
		ArticleSummary: toSummary(article),
		Subtitle:       article.Subtitle,
		Views:          article.Views,
		TOC:            buildTOC(article.Content),
		Content:        article.Content,
	}
}

func decodeTags(raw string) []string {
	var tags []string
	if err := json.Unmarshal([]byte(raw), &tags); err != nil {
		return []string{}
	}
	return tags
}

func effectiveVisibility(article model.Article) string {
	if article.Visibility == model.VisibilityInherit {
		return article.Category.Visibility
	}
	return article.Visibility
}

func formatTime(value any) string {
	switch typed := value.(type) {
	case nil:
		return ""
	case interface{ Format(string) string }:
		return typed.Format("2006-01-02T15:04:05Z07:00")
	default:
		return ""
	}
}

func buildTOC(content string) []articleresponse.TOCItem {
	lines := strings.Split(content, "\n")
	items := make([]articleresponse.TOCItem, 0)
	section := 0
	subsection := 0

	for _, line := range lines {
		if strings.HasPrefix(line, "## ") {
			section++
			subsection = 0
			items = append(items, articleresponse.TOCItem{
				Number: intLabel(section) + ".",
				Label:  strings.TrimSpace(strings.TrimPrefix(line, "## ")),
				Active: len(items) == 0,
			})
			continue
		}
		if strings.HasPrefix(line, "### ") {
			subsection++
			items = append(items, articleresponse.TOCItem{
				Number: intLabel(section) + "." + intLabel(subsection),
				Label:  strings.TrimSpace(strings.TrimPrefix(line, "### ")),
				Active: false,
			})
		}
	}

	if len(items) == 0 {
		items = append(items, articleresponse.TOCItem{
			Number: "1.",
			Label:  "Article",
			Active: true,
		})
	}

	return items
}

func intLabel(value int) string {
	if value <= 0 {
		return "1"
	}
	return strconv.Itoa(value)
}
