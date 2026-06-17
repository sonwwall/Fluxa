export type ProfileLink = {
  href: string;
  label: string;
};

export type ProfileNowItem = {
  color: "blue" | "emerald" | "purple" | "violet";
  status: string;
  text: string;
  title: string;
};

export type ProfileJourneyItem = {
  description: string;
  period: string;
  title: string;
};

export type ProfilePrinciple = {
  description: string;
  title: string;
};

export type AuthorProfile = {
  bio: string;
  displayName: string;
  headline: string;
  journey: ProfileJourneyItem[];
  links: ProfileLink[];
  location: string;
  now: ProfileNowItem[];
  principles: ProfilePrinciple[];
  skills: {
    group: string;
    items: string[];
  }[];
};
