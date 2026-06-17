package response

type Category struct {
	ID         string `json:"id"`
	Slug       string `json:"slug"`
	Name       string `json:"name"`
	Visibility string `json:"visibility"`
}

type Cover struct {
	Accent   string  `json:"accent"`
	ImageURL *string `json:"image_url"`
	Alt      string  `json:"alt"`
}

type ArticleSummary struct {
	ID          string   `json:"id"`
	Slug        string   `json:"slug"`
	Title       string   `json:"title"`
	Excerpt     string   `json:"excerpt"`
	Category    Category `json:"category"`
	Tags        []string `json:"tags"`
	Status      string   `json:"status"`
	Visibility  string   `json:"visibility"`
	PublishedAt string   `json:"published_at"`
	ReadTime    string   `json:"read_time"`
	Cover       Cover    `json:"cover"`
}

type ArticleDetail struct {
	ArticleSummary
	Subtitle string    `json:"subtitle"`
	Views    string    `json:"views"`
	TOC      []TOCItem `json:"toc"`
	Content  string    `json:"content"`
}

type TOCItem struct {
	Number string `json:"number"`
	Label  string `json:"label"`
	Active bool   `json:"active"`
}

type HomeData struct {
	Featured ArticleSummary   `json:"featured"`
	Latest   []ArticleSummary `json:"latest"`
	Popular  []ArticleSummary `json:"popular"`
	Topics   []string         `json:"topics"`
}
