function createImageUrl(prompt: string, imageSize: string) {
  return `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent(prompt)}&image_size=${encodeURIComponent(imageSize)}`;
}

export type MinistryCategory = "ministries" | "organizations" | "apostolates";

export type Ministry = {
  slug: string;
  title: string;
  category: MinistryCategory;
  summary: string;
  description: string;
  image: string;
  contactPerson?: string;
  activities: string[];
  tags: string[];
};

export const ministryCategories: Array<{ key: MinistryCategory; label: string }> = [
  { key: "ministries", label: "Ministries" },
  { key: "organizations", label: "Organizations" },
  { key: "apostolates", label: "Apostolates" },
];

export const ministriesData: Ministry[] = [
  {
    slug: "altar-servers",
    title: "Ministry of Altar Servers",
    category: "ministries",
    summary: "Youth serving the altar during Mass and liturgical celebrations.",
    description:
      "Primarily composed of boys who have received their First Communion, altar servers assist the priest and deacons during Mass and other liturgical functions by preparing the altar, holding the Roman Missal, carrying the cross, candles, and incense, and responding to the needs of the celebrant.",
    image:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=ultra%20realistic%20photo%2C%20Catholic%20altar%20servers%20inside%20a%20historic%20Philippine%20church%2C%20solemn%20liturgy%2C%20warm%20light%2C%20red%20and%20white%20vestments%2C%20high%20detail&image_size=landscape_4_3",
    activities: ["Liturgical Service Training", "Spiritual Formation", "Monthly Meetings"],
    tags: ["Liturgy", "Youth", "Formation"],
  },
  {
    slug: "lectors-commentators",
    title: "Lectors and Commentators Ministry",
    category: "ministries",
    summary: "Parishioners entrusted to proclaim Scripture and guide the assembly through the liturgy.",
    description:
      "This ministry is composed of parishioners trained and entrusted to proclaim the Word of God during the Liturgy of the Word. Lectors bring the Scriptures to life by reading with clarity, understanding, and conviction. Commentators guide the congregation through the different parts of the Mass, ensuring active and informed participation.",
    image: createImageUrl(
      "ultra realistic photo, Catholic lector proclaiming Scripture at a church ambo, Philippine parish setting, reverent worship atmosphere, warm lighting, high detail",
      "landscape_4_3",
    ),
    activities: ["Scripture Reading Workshop", "Voice Training", "Liturgical Formation", "Regular Prayer Meetings"],
    tags: ["Liturgy", "Scripture", "Formation"],
  },
  {
    slug: "music-ministry",
    title: "Music Ministry",
    category: "ministries",
    summary: "Choirs and musicians leading sacred song during Mass and sacramental celebrations.",
    description:
      "The Music Ministry leads the liturgical assembly in song, enhancing the celebration of the Eucharist and other sacraments through sacred music. Members prepare hymns and responses appropriate to each liturgical season and celebration.",
    image: createImageUrl(
      "ultra realistic photo, church choir singing during Catholic Mass, organ and microphones, Philippine parish, sacred music atmosphere, warm interior lighting",
      "landscape_4_3",
    ),
    activities: ["Choir Practice", "Music Theory Classes", "Voice Training", "Special Liturgical Celebrations"],
    tags: ["Liturgy", "Music", "Choir"],
  },
  {
    slug: "extraordinary-ministers-holy-communion",
    title: "Extraordinary Ministers of Holy Communion",
    category: "ministries",
    summary: "Lay ministers assisting in the reverent distribution of the Eucharist and communion to the sick.",
    description:
      "The Extraordinary Ministers of Holy Communion are laypersons commissioned to assist in the distribution of the Holy Eucharist during Mass and to the sick. This ministry requires deep reverence, a solid understanding of the Eucharist, and a commitment to pastoral care.",
    image: createImageUrl(
      "ultra realistic photo, extraordinary ministers distributing Holy Communion in a Catholic church, reverent liturgy, Philippine parish, warm natural light",
      "landscape_4_3",
    ),
    activities: ["Eucharistic Formation", "Pastoral Care Training", "Regular Spiritual Retreats", "Communion Service to the Sick"],
    tags: ["Liturgy", "Pastoral Care", "Eucharist"],
  },
  {
    slug: "greeters-collectors",
    title: "Greeters and Collectors Ministry",
    category: "ministries",
    summary: "Welcoming parishioners and supporting the orderly flow of liturgical celebrations.",
    description:
      "Greeters welcome parishioners and visitors with warmth and kindness, offering assistance when needed. Collectors ensure the reverent and organized collection of offerings during Mass and help manage the flow of congregants.",
    image: "/img/ministry/gcm.JPG",
    activities: ["Hospitality Training", "Church Protocol Sessions"],
    tags: ["Hospitality", "Liturgy", "Service"],
  },
  {
    slug: "mother-butler-guild",
    title: "Mother Butler Guild",
    category: "ministries",
    summary: "Caring for altar linens, sacred vessels, vestments, and sanctuary preparation.",
    description:
      "The Mother Butler Guild takes charge of preparing and maintaining the altar linens, vestments, sacred vessels, and decorations. Working quietly behind the scenes, they help ensure the sanctuary remains clean, orderly, and worthy of the liturgy.",
    image: "/img/ministry/mbg.JPG",
    activities: ["Altar Preparation", "Vestment Care", "Flower Arrangement", "Church Decoration"],
    tags: ["Sanctuary", "Liturgy", "Stewardship"],
  },
  {
    slug: "liturgical-arts-shrine-heritage",
    title: "Liturgical Arts and Shrine Heritage",
    category: "ministries",
    summary: "Preserving the beauty and sacred character of the shrine through art and design.",
    description:
      "This ministry is responsible for preserving the beauty and solemnity of the shrine through sacred art, liturgical design, and the promotion of cultural heritage. It oversees visual elements that express the mystery of faith.",
    image: createImageUrl(
      "ultra realistic photo, Catholic shrine interior details, sacred art and liturgical decoration, ornate Philippine church, gold accents, high detail",
      "landscape_4_3",
    ),
    activities: ["Shrine Design", "Liturgical Space Decoration", "Cultural Heritage Promotion"],
    tags: ["Arts", "Heritage", "Liturgy"],
  },
  {
    slug: "social-communications",
    title: "Social Communications Ministry",
    category: "ministries",
    summary: "Documenting parish life and communicating announcements across digital platforms.",
    description:
      "The Social Communications Ministry serves as the voice of the parish in the digital age. It manages communication platforms such as the parish website, social media, newsletters, and visual displays to share announcements and document parish life.",
    image: "/img/ministry/socom.jpg",
    activities: ["Social Media Management", "Website Maintenance", "Parish Bulletin Production", "Event Documentation"],
    tags: ["Media", "Communications", "Digital"],
  },
  {
    slug: "youth-ministry",
    title: "Youth Ministry",
    category: "organizations",
    summary: "The youth arm of the parish focused on formation, service, and community life.",
    description:
      "The Youth Ministry nurtures the spiritual life of the youth and equips them for active involvement in Church and society through formation, peer gatherings, outreach programs, and parish service.",
    image: createImageUrl(
      "ultra realistic photo, Catholic youth ministry gathering in a parish hall, joyful Filipino youth, faith formation event, warm natural lighting",
      "landscape_4_3",
    ),
    activities: ["Weekly Youth Gatherings", "Annual Youth Camp", "Leadership Training", "Community Service Projects"],
    tags: ["Youth", "Formation", "Community"],
  },
  {
    slug: "family-life-ministry",
    title: "Family and Life Ministry",
    category: "organizations",
    summary: "Supporting marriage, family formation, counseling, and respect for life.",
    description:
      "Committed to upholding the dignity of life and the sanctity of marriage and the family, this ministry offers formation programs, counseling, retreats, and advocacy work for couples and families.",
    image: createImageUrl(
      "ultra realistic photo, Catholic family ministry workshop, Filipino families in parish setting, warm hopeful atmosphere, natural colors",
      "landscape_4_3",
    ),
    activities: ["Family Formation", "Couple Counseling", "Retreats", "Advocacy Work"],
    tags: ["Family", "Life", "Formation"],
  },
  {
    slug: "hijos-service-of-maria",
    title: "Hijos in the Service of Maria",
    category: "organizations",
    summary: "Supporting shrine events, crowd management, and devotion to Our Mother of Perpetual Help.",
    description:
      "The Hijos in the Service of Maria help manage traffic, coordinate security, and maintain order during shrine events and major celebrations. The group also fosters devotion to Our Mother of Perpetual Help and responsibility in service.",
    image: createImageUrl(
      "ultra realistic photo, Catholic lay volunteers assisting during a Marian procession, Filipino parish shrine event, organized and reverent crowd, evening lights",
      "landscape_4_3",
    ),
    activities: ["Traffic Management", "Security Coordination", "Order Maintenance"],
    tags: ["Devotion", "Marian", "Volunteer"],
  },
  {
    slug: "responsible-voting-council",
    title: "Parish Pastoral Council for Responsible Voting",
    category: "organizations",
    summary: "Promoting civic responsibility, voter education, and moral discernment.",
    description:
      "The Parish Pastoral Council for Responsible Voting educates the faithful on civic duties and promotes voter education, awareness of political issues, and moral discernment based on Gospel values.",
    image: createImageUrl(
      "ultra realistic photo, Catholic civic education seminar in parish hall, responsible voting awareness, Filipino community discussion, documentary style",
      "landscape_4_3",
    ),
    activities: ["Voter Education", "Awareness of Political Issues", "Moral Discernment"],
    tags: ["Civic", "Formation", "Justice"],
  },
  {
    slug: "biblical-apostolate",
    title: "Biblical Apostolate",
    category: "apostolates",
    summary: "Encouraging prayerful reading, study, and sharing of the Word of God.",
    description:
      "The Biblical Apostolate encourages the prayerful reading, study, and sharing of the Word of God through Bible study groups, lectio divina, scripture reflections, and catechetical sessions.",
    image: createImageUrl(
      "ultra realistic photo, Catholic Bible study group in parish setting, open Scriptures on table, warm light, contemplative atmosphere",
      "landscape_4_3",
    ),
    activities: ["Bible Study Groups", "Lectio Divina", "Scripture Reflections", "Catechetical Sessions"],
    tags: ["Scripture", "Prayer", "Formation"],
  },
  {
    slug: "ministry-on-ecology",
    title: "Ministry on Ecology",
    category: "apostolates",
    summary: "Promoting care for creation through parish-based ecological action and formation.",
    description:
      "This ministry leads the parish in promoting care for creation. It conducts educational campaigns, coordinates eco-friendly practices, and implements parish-based environmental projects inspired by Catholic social teaching and Laudato Si’.",
    image: createImageUrl(
      "ultra realistic photo, parish ecology ministry planting trees, Filipino volunteers outdoors, Catholic environmental stewardship, bright natural light",
      "landscape_4_3",
    ),
    activities: ["Eco-Friendly Practices", "Environmental Projects", "Education Campaigns"],
    tags: ["Ecology", "Outreach", "Stewardship"],
  },
  {
    slug: "lay-health-care",
    title: "Parish Lay Health Care Ministry",
    category: "apostolates",
    summary: "Bringing compassionate care and health support to the sick and elderly.",
    description:
      "This pastoral health care ministry brings compassion and care to the sick, elderly, and those in need within the parish community. Members provide health education, simple medical checkups, referrals, and support for sacramental preparation.",
    image: createImageUrl(
      "ultra realistic photo, parish health care volunteers visiting an elderly parishioner, compassionate Catholic pastoral care, Filipino home setting",
      "landscape_4_3",
    ),
    activities: ["Health Education", "Simple Medical Checkups", "Referrals", "Sacramental Preparation"],
    tags: ["Health", "Pastoral Care", "Service"],
  },
  {
    slug: "livelihood-pondo-ng-pinoy",
    title: "Livelihood Ministry | Pondo ng Pinoy",
    category: "apostolates",
    summary: "Helping families pursue sustainable income and practical support through parish programs.",
    description:
      "The Livelihood Ministry supports livelihood programs that provide families with sustainable means of income through practical assistance, training, and opportunities for empowerment rooted in charity and solidarity.",
    image: createImageUrl(
      "ultra realistic photo, Catholic parish livelihood workshop, Filipino families learning small business skills, hopeful community atmosphere",
      "landscape_4_3",
    ),
    activities: ["Livelihood Support", "Charity Programs", "Empowerment Workshops"],
    tags: ["Livelihood", "Charity", "Empowerment"],
  },
  {
    slug: "pwd-shrine-ministry",
    title: "Shrine Ministry for Persons with Disability",
    category: "apostolates",
    summary: "Advocating for accessibility, inclusion, and full participation in parish life.",
    description:
      "This ministry ensures that persons with disabilities are welcomed, accommodated, and empowered within the Church. It promotes accessibility, offers tailored pastoral care, and encourages active participation in liturgical and parish life.",
    image: createImageUrl(
      "ultra realistic photo, inclusive Catholic parish ministry with persons with disabilities participating in church community, respectful and uplifting atmosphere",
      "landscape_4_3",
    ),
    activities: ["Accessibility Support", "Pastoral Care", "Inclusive Participation"],
    tags: ["Inclusion", "Accessibility", "Pastoral Care"],
  },
];

