package service

import (
	"strconv"
	"time"

	"fluxa-server/internal/article/model"
	"fluxa-server/internal/article/repository"
	articleresponse "fluxa-server/internal/article/response"
	categorymodel "fluxa-server/internal/category/model"
)

func toAuthorRows(articles []model.Article) []articleresponse.AuthorArticleRow {
	rows := make([]articleresponse.AuthorArticleRow, 0, len(articles))
	for _, article := range articles {
		rows = append(rows, toAuthorRow(article))
	}
	return rows
}

func toAuthorRow(article model.Article) articleresponse.AuthorArticleRow {
	return articleresponse.AuthorArticleRow{
		ID:      article.ID,
		Title:   article.Title,
		Excerpt: article.Excerpt,
		Category: articleresponse.AuthorCategory{
			ID:         article.Category.ID,
			Slug:       article.Category.Slug,
			Name:       article.Category.Name,
			Visibility: article.Category.Visibility,
		},
		Tags:        decodeTags(article.Tags),
		Status:      article.Status,
		Visibility:  effectiveVisibility(article),
		PublishedAt: formatOptionalTime(article.PublishedAt),
		ScheduledAt: formatOptionalTime(article.ScheduledAt),
		UpdatedAt:   formatTime(article.UpdatedAt),
		Views:       fallbackViews(article.Views),
	}
}

func toAuthorDraft(article model.Article) articleresponse.AuthorArticleDraft {
	id := article.ID
	return articleresponse.AuthorArticleDraft{
		ID:         &id,
		Title:      article.Title,
		Excerpt:    article.Excerpt,
		Content:    article.Content,
		CategoryID: article.CategoryID,
		Tags:       decodeTags(article.Tags),
		Status:     article.Status,
		Visibility: article.Visibility,
	}
}

func newAuthorDraft(categories []categorymodel.Category) articleresponse.AuthorArticleDraft {
	var categoryID string
	if len(categories) > 0 {
		categoryID = categories[0].ID
	}

	return articleresponse.AuthorArticleDraft{
		ID:         nil,
		Title:      "",
		Excerpt:    "",
		Content:    "# Untitled article\n\nStart writing in Markdown...",
		CategoryID: categoryID,
		Tags:       []string{},
		Status:     model.StatusDraft,
		Visibility: model.VisibilityInherit,
	}
}

func toAuthorCategories(categories []categorymodel.Category) []articleresponse.AuthorCategory {
	items := make([]articleresponse.AuthorCategory, 0, len(categories))
	for _, category := range categories {
		items = append(items, articleresponse.AuthorCategory{
			ID:         category.ID,
			Slug:       category.Slug,
			Name:       category.Name,
			Visibility: category.Visibility,
		})
	}
	return items
}

func toAuthorOverview(counts repository.StatusCounts) articleresponse.AuthorArticlesOverview {
	return articleresponse.AuthorArticlesOverview{
		Published: counts.Published,
		Drafts:    counts.Drafts,
		Scheduled: counts.Scheduled,
		Archived:  counts.Archived,
	}
}

func formatOptionalTime(value *time.Time) *string {
	if value == nil {
		return nil
	}
	formatted := formatTime(*value)
	return &formatted
}

func fallbackViews(value string) string {
	if value == "" {
		return "-"
	}
	return value
}

func formatCount(value int64) string {
	return strconv.FormatInt(value, 10)
}
