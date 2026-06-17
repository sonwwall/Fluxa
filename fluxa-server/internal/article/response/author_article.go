package response

type AuthorCategory struct {
	ID         string `json:"id"`
	Slug       string `json:"slug"`
	Name       string `json:"name"`
	Visibility string `json:"visibility"`
}

type AuthorArticleRow struct {
	ID          string         `json:"id"`
	Title       string         `json:"title"`
	Excerpt     string         `json:"excerpt"`
	Category    AuthorCategory `json:"category"`
	Tags        []string       `json:"tags"`
	Status      string         `json:"status"`
	Visibility  string         `json:"visibility"`
	PublishedAt *string        `json:"published_at"`
	ScheduledAt *string        `json:"scheduled_at"`
	UpdatedAt   string         `json:"updated_at"`
	Views       string         `json:"views"`
}

type AuthorArticleDraft struct {
	ID         *string  `json:"id"`
	Title      string   `json:"title"`
	Excerpt    string   `json:"excerpt"`
	Content    string   `json:"content"`
	CategoryID string   `json:"category_id"`
	Tags       []string `json:"tags"`
	Status     string   `json:"status"`
	Visibility string   `json:"visibility"`
}

type AuthorArticlesOverview struct {
	Published int64 `json:"published"`
	Drafts    int64 `json:"drafts"`
	Scheduled int64 `json:"scheduled"`
	Archived  int64 `json:"archived"`
}

type AuthorArticlesData struct {
	List       []AuthorArticleRow     `json:"list"`
	Page       int                    `json:"page"`
	PageSize   int                    `json:"page_size"`
	Total      int64                  `json:"total"`
	Overview   AuthorArticlesOverview `json:"overview"`
	Categories []AuthorCategory       `json:"categories"`
}

type AuthorDashboardSummary struct {
	Greeting           string `json:"greeting"`
	PublishedThisMonth int64  `json:"published_this_month"`
	PendingDrafts      int64  `json:"pending_drafts"`
}

type AuthorDashboardStat struct {
	Label  string `json:"label"`
	Value  string `json:"value"`
	Detail string `json:"detail"`
	Tone   string `json:"tone"`
}

type AuthorDashboardData struct {
	Summary        AuthorDashboardSummary `json:"summary"`
	Stats          []AuthorDashboardStat  `json:"stats"`
	RecentArticles []AuthorArticleRow     `json:"recent_articles"`
	ChartPoints    []int                  `json:"chart_points"`
}

type AuthorDraftPageData struct {
	Draft      AuthorArticleDraft `json:"draft"`
	Categories []AuthorCategory   `json:"categories"`
}

type SavedArticle struct {
	ID string `json:"id"`
}

type ArticleStatusResult struct {
	ID     string `json:"id"`
	Status string `json:"status"`
}
