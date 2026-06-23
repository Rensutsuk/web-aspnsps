function createImageUrl(prompt: string, imageSize: string) {
  return `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent(prompt)}&image_size=${encodeURIComponent(imageSize)}`;
}

export type ServiceCategory = "sacrament" | "pastoral";

export type ServiceFact = {
  label: string;
  value: string;
};

export type ServiceRequirementGroup = {
  title: string;
  items: string[];
};

export type ServiceScheduleItem = {
  label: string;
  value: string;
  note?: string;
};

export type ServiceContact = {
  primaryLabel: string;
  primaryValue: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryValue?: string;
  secondaryHref?: string;
  note?: string;
};

export type ParishService = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  category: ServiceCategory;
  image: string;
  tags: string[];
  quickFacts: ServiceFact[];
  requirements: ServiceRequirementGroup[];
  schedule: ServiceScheduleItem[];
  reminders: string[];
  contact: ServiceContact;
  urgency?: "standard" | "time-sensitive" | "urgent";
};

export type OfficeRequest = {
  title: string;
  summary: string;
  actionLabel: string;
  actionHref: string;
};

export const servicesHeroImage = createImageUrl(
  "Ultra realistic documentary photo, welcoming parish office and church entrance at a historic Manila Catholic parish, parishioners speaking with staff, warm afternoon light, reverent and approachable atmosphere, natural colors, high detail, editorial photography",
  "landscape_16_9",
);

export const parishServices: ParishService[] = [
  {
    slug: "baptism",
    title: "Baptism",
    summary: "Begin a child's life in the Church with clear requirements, schedules, and practical reminders before registration.",
    description:
      "Holy Baptism is the gateway to Christian life and the first sacrament received by many Catholic families. This service page is designed to help parents and sponsors prepare documents early, understand the usual flow, and coordinate with the parish office with fewer back-and-forth questions.",
    category: "sacrament",
    image: createImageUrl(
      "Ultra realistic photo, infant baptism inside a Catholic parish church in Manila, priest pouring baptismal water, family and godparents nearby, soft natural light, solemn joyful atmosphere, high detail",
      "landscape_4_3",
    ),
    tags: ["Parents", "Sponsors", "Documents"],
    quickFacts: [
      { label: "Start with", value: "Office registration" },
      { label: "Availability", value: "Sunday groups and appointments" },
      { label: "Lead time", value: "At least 1 week ahead" },
    ],
    requirements: [
      {
        title: "Infant Baptism (0-2 years)",
        items: [
          "Birth certificate with registry details",
          "Permission letter from your home parish if you are not from the parish",
          "Parents and godparents attend the pre-baptism seminar",
          "Register at least one week before the baptism date",
        ],
      },
      {
        title: "Child Baptism (3-6 years)",
        items: [
          "Birth certificate with registry details",
          "Certificate of no baptism from nearby churches where the child resides",
          "Permission letter from your home parish if needed",
          "Parents and godparents attend the pre-baptism seminar",
        ],
      },
      {
        title: "Child Baptism (7 years old and above)",
        items: [
          "Birth certificate with registry details",
          "Certificate of no baptism from nearby churches where the child resides",
          "Interview with the parish priest or assigned office staff",
          "Catechism preparation before the sacrament",
        ],
      },
    ],
    schedule: [
      {
        label: "Group baptism",
        value: "Usually held on Sundays at 11:00 AM",
        note: "Seminar usually starts earlier on the same day. Confirm the latest parish schedule before registering.",
      },
      {
        label: "Special or individual baptism",
        value: "Tuesday to Saturday by appointment",
        note: "Arrival time and seminar details are coordinated with the parish office.",
      },
    ],
    reminders: [
      "Bring both the original and a photocopy of the birth certificate when registering.",
      "Godparents should be practicing Catholics who have received Baptism and Confirmation.",
      "Late arrivals to the seminar may need to be rescheduled.",
      "Please observe proper church attire on the day of the baptism.",
    ],
    contact: {
      primaryLabel: "Call parish office",
      primaryValue: "8741-8010",
      primaryHref: "tel:8741-8010",
      secondaryLabel: "Email",
      secondaryValue: "nsps_parish@yahoo.com",
      secondaryHref: "mailto:nsps_parish@yahoo.com",
      note: "The office can confirm schedules, fees, and document questions before you visit.",
    },
    urgency: "time-sensitive",
  },
  {
    slug: "confirmation",
    title: "Confirmation",
    summary: "Prepare candidates for the sacrament with guidance on documents, catechesis, and parish scheduling updates.",
    description:
      "Confirmation completes baptismal grace and strengthens a Catholic's life in faith through the gift of the Holy Spirit. Because confirmation schedules often depend on parish or vicariate coordination, this section focuses on what candidates usually need to prepare before a batch is announced.",
    category: "sacrament",
    image: createImageUrl(
      "Ultra realistic photo, Catholic confirmation ceremony inside a Manila parish church, bishop or priest anointing a young candidate, reverent crowd, warm church light, high detail",
      "landscape_4_3",
    ),
    tags: ["Catechesis", "Candidates", "Schedule updates"],
    quickFacts: [
      { label: "Start with", value: "Office inquiry" },
      { label: "Availability", value: "Batch or parish announcement" },
      { label: "Preparation", value: "Documents and catechesis" },
    ],
    requirements: [
      {
        title: "Usual documentary requirements",
        items: [
          "Recent baptismal certificate with parish annotation if requested",
          "Confirmation registration form from the parish office",
          "Valid identification or school ID of the candidate when available",
        ],
      },
      {
        title: "Formation requirements",
        items: [
          "Attendance in catechetical instruction or review sessions",
          "Presence of a qualified sponsor confirmed by the parish",
          "Participation in orientation or rehearsal if scheduled",
        ],
      },
    ],
    schedule: [
      {
        label: "Confirmation batches",
        value: "Posted by parish announcement",
        note: "Exact dates depend on the parish calendar and availability of the confirming minister.",
      },
      {
        label: "Candidate preparation",
        value: "Scheduled before the sacrament",
        note: "Orientation, catechesis, and rehearsal are usually announced together with the batch schedule.",
      },
    ],
    reminders: [
      "Do not request documents too early if the parish requires newly issued copies.",
      "Sponsors should be practicing Catholics and meet parish requirements.",
      "Keep contact information updated so the office can notify your batch of schedule changes.",
    ],
    contact: {
      primaryLabel: "Call parish office",
      primaryValue: "8741-8010",
      primaryHref: "tel:8741-8010",
      secondaryLabel: "Email",
      secondaryValue: "nsps_parish@yahoo.com",
      secondaryHref: "mailto:nsps_parish@yahoo.com",
      note: "Please confirm the current confirmation calendar before preparing final paperwork.",
    },
  },
  {
    slug: "funeral-services",
    title: "Funeral Services",
    summary: "Reach the parish quickly for funeral Mass coordination, pastoral guidance, and immediate assistance for grieving families.",
    description:
      "The parish accompanies families in times of loss with prayer, liturgical support, and practical coordination for funeral services. This service is designed for urgent contact first, with the office helping families confirm availability, needed details, and the next steps for scheduling.",
    category: "pastoral",
    image: createImageUrl(
      "Ultra realistic photo, quiet Catholic funeral mass inside a parish church, candles and floral arrangements near the altar, compassionate solemn atmosphere, natural light, high detail",
      "landscape_4_3",
    ),
    tags: ["Urgent", "Family assistance", "Mass coordination"],
    quickFacts: [
      { label: "Start with", value: "Immediate office call" },
      { label: "Availability", value: "Subject to priest and church schedule" },
      { label: "Priority", value: "Urgent pastoral assistance" },
    ],
    requirements: [
      {
        title: "Initial information to prepare",
        items: [
          "Name of the deceased",
          "Preferred date or funeral home coordination details",
          "Contact number of the immediate family representative",
          "Location where the priest or family should be reached",
        ],
      },
    ],
    schedule: [
      {
        label: "Funeral Mass",
        value: "Coordinated by availability",
        note: "Please contact the parish office as early as possible so staff can coordinate with the assigned priest.",
      },
      {
        label: "Pastoral guidance",
        value: "Available through the parish office",
        note: "Families may receive help on the service flow, prayer intentions, and scheduling concerns.",
      },
    ],
    reminders: [
      "Urgent coordination is best handled by phone instead of email.",
      "Bring any funeral home schedule details to help the parish avoid timing conflicts.",
      "The parish office can clarify what liturgical options are available for the service.",
    ],
    contact: {
      primaryLabel: "Call parish office",
      primaryValue: "8741-8010",
      primaryHref: "tel:8741-8010",
      secondaryLabel: "Email",
      secondaryValue: "nsps_parish@yahoo.com",
      secondaryHref: "mailto:nsps_parish@yahoo.com",
      note: "For urgent cases, please call first so the family can be assisted immediately.",
    },
    urgency: "urgent",
  },
  {
    slug: "house-blessings",
    title: "House Blessings",
    summary: "Request a home blessing with a simple checklist so the parish can coordinate a priest visit efficiently.",
    description:
      "House blessings are a pastoral way of dedicating a home to prayer, peace, and Christian family life. The parish can help families request a visit, prepare the basic information needed, and coordinate a practical schedule with the priest.",
    category: "pastoral",
    image: createImageUrl(
      "Ultra realistic photo, Catholic priest blessing a family home in Manila, family gathered respectfully, small altar with crucifix and holy water, warm daylight, realistic documentary style",
      "landscape_4_3",
    ),
    tags: ["Home visit", "By appointment", "Family prayer"],
    quickFacts: [
      { label: "Start with", value: "Office appointment request" },
      { label: "Availability", value: "By priest schedule" },
      { label: "What to prepare", value: "Address and preferred time" },
    ],
    requirements: [
      {
        title: "Basic information",
        items: [
          "Complete home address with landmarks",
          "Name of the requesting family",
          "Preferred date and time range",
          "Mobile number for confirmation or follow-up",
        ],
      },
      {
        title: "Day-of-visit preparation",
        items: [
          "Prepare a prayerful space where the family can gather",
          "Have a small table ready if you would like to place a crucifix or holy water",
          "Coordinate with the parish if the area has special access instructions",
        ],
      },
    ],
    schedule: [
      {
        label: "House blessing visits",
        value: "By appointment",
        note: "Schedules depend on pastoral availability and area coordination.",
      },
      {
        label: "Request timing",
        value: "Submit early when possible",
        note: "Advance notice helps the parish group nearby requests or avoid schedule conflicts.",
      },
    ],
    reminders: [
      "Please wait for confirmation before announcing a final schedule to guests or neighbors.",
      "If your area has limited parking or security access, inform the office in advance.",
      "Parish availability may vary during feast preparations, Holy Week, and other major liturgical dates.",
    ],
    contact: {
      primaryLabel: "Call parish office",
      primaryValue: "8741-8010",
      primaryHref: "tel:8741-8010",
      secondaryLabel: "Email",
      secondaryValue: "nsps_parish@yahoo.com",
      secondaryHref: "mailto:nsps_parish@yahoo.com",
      note: "The parish office can help coordinate the request and advise the best lead time.",
    },
  },
];

export const officeRequests: OfficeRequest[] = [
  {
    title: "Document Requests",
    summary: "Ask the parish office about baptismal, confirmation, marriage, or death certificates and the details needed for release.",
    actionLabel: "Email the office",
    actionHref: "mailto:nsps_parish@yahoo.com",
  },
  {
    title: "Urgent Sick Call",
    summary: "For anointing, Holy Communion, or priest visitation for the sick, contact the parish office right away with the patient's location.",
    actionLabel: "Call now",
    actionHref: "tel:8741-8010",
  },
];
