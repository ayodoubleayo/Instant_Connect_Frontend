export type IntentItem = {
  slug: string;
  title: string;
};

export const intentClusters = {
  relationship: [
    { slug: "marriage", title: "Marriage Partner" },
    { slug: "serious", title: "Serious Relationship" },
    { slug: "casual", title: "Casual Dating" },
  ],

  activity: [
    { slug: "walk-partner", title: "Walking Partner" },
    { slug: "gym-partner", title: "Gym Partner" },
    { slug: "reading-partner", title: "Reading Partner" },
    { slug: "travel-partner", title: "Travel Partner" },
    { slug: "clubbing-partner", title: "Clubbing Partner" },
  ],

  social: [
    { slug: "gist-partner", title: "Gist Partner" },
    { slug: "laughter-partner", title: "Laughter Partner" },
    { slug: "crying-partner", title: "Crying Partner" },
    { slug: "street-friend", title: "Street Friend" },
  ],

  faith: [
    { slug: "praying-partner", title: "Praying Partner" },
  ],
};
