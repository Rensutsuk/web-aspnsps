export type PriestProfile = {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageSrc?: string;
  imageAlt?: string;
};

export const priests: PriestProfile[] = [
  {
    id: "fr-tony",
    name: "Rev. Fr. Antonio V. Navarette Jr.",
    role: "Rector and Parish Priest",
    bio: "Serving our shrine community since 2021. Fr. Tony leads our community with wisdom and compassion.",
    imageSrc: "/img/about/priest/fr-tony.jpg",
    imageAlt: "Rev. Fr. Antonio V. Navarette Jr.",
  },
];

