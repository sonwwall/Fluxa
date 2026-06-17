package response

type Profile struct {
	DisplayName string        `json:"display_name"`
	Headline    string        `json:"headline"`
	Bio         string        `json:"bio"`
	Location    string        `json:"location"`
	Links       []ProfileLink `json:"links"`
	Now         []NowItem     `json:"now"`
	Skills      []SkillGroup  `json:"skills"`
	Journey     []JourneyItem `json:"journey"`
	Principles  []Principle   `json:"principles"`
}

type ProfileLink struct {
	Label string `json:"label"`
	Href  string `json:"href"`
}

type NowItem struct {
	Title  string `json:"title"`
	Status string `json:"status"`
	Text   string `json:"text"`
	Color  string `json:"color"`
}

type SkillGroup struct {
	Group string   `json:"group"`
	Items []string `json:"items"`
}

type JourneyItem struct {
	Period      string `json:"period"`
	Title       string `json:"title"`
	Description string `json:"description"`
}

type Principle struct {
	Title       string `json:"title"`
	Description string `json:"description"`
}
