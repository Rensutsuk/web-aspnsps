export type DaySchedule = {
  day: string;
  times: string[];
};

export type OtherService = {
  title: string;
  image: string;
  schedules: DaySchedule[];
};

export const massSchedules: DaySchedule[] = [
  { day: "Ordinary Weekday", times: ["6:00 AM", "6:00 PM"] },
  { day: "Wednesday", times: ["6:30 AM", "12:15 PM", "6:00 PM"] },
  { day: "First Saturday", times: ["6:00 AM", "11:00 PM", "6:00 PM"] },
  {
    day: "Sunday",
    times: ["6:00 AM", "7:00 AM", "8:30 AM", "10:00 AM", "12:15 PM", "4:00 PM", "5:30 PM", "7:00 PM"],
  },
];

export const confessionSchedules: DaySchedule[] = [
  { day: "Wednesday", times: ["5:30 PM - 6:00 PM"] },
  { day: "Friday", times: ["5:30 PM - 6:00 PM"] },
  { day: "Saturday", times: ["5:30 PM - 6:00 PM"] },
];

export const otherServices: OtherService[] = [
  {
    title: "Wednesday Devotion to our Mother of Perpetual Help",
    image: "https://gv0zzhe6ot.ufs.sh/f/qNNctTpmyN4Mr0o9yb2k1SpQGxfEXm9i8TetMBIULur6dZVH",
    schedules: [{ day: "Wednesdays", times: ["5:50 AM - 6:15AM", "11:45 AM - 12:15 PM", "5:00 PM - 6:00 PM"] }],
  },
  {
    title: "Holy Hour",
    image: "https://gv0zzhe6ot.ufs.sh/f/qNNctTpmyN4Mts4LPR8g6OJa93jKWYuyGorq1AxzPRFMeBEc",
    schedules: [
      { day: "Wednesdays", times: ["5:00 PM - 6:00 PM"] },
      { day: "First Friday", times: ["5:00 PM - 6:00 PM"] },
    ],
  },
  {
    title: "Rosary",
    image: "https://gv0zzhe6ot.ufs.sh/f/qNNctTpmyN4M0fqdDkNdQm8MAPFokJxzC2Ve5ctlRUWaSyGY",
    schedules: [{ day: "Daily", times: ["5:45 PM"] }],
  },
  {
    title: "Morning and Evening Prayer",
    image: "https://gv0zzhe6ot.ufs.sh/f/qNNctTpmyN4MrpHd3Fb2k1SpQGxfEXm9i8TetMBIULur6dZV",
    schedules: [{ day: "Weekdays", times: ["15 minutes before mass"] }],
  },
];

export const scheduleBanners = {
  mass: {
    image: "https://gv0zzhe6ot.ufs.sh/f/qNNctTpmyN4MRmF5GzONjIzrhcLZFMG7lqYpdQCf9vaRBPD0",
    alt: "Mass Schedule",
  },
  confession: {
    image: "https://gv0zzhe6ot.ufs.sh/f/qNNctTpmyN4MouryarDFvpgnQWkasj82S6td5AU4DmGhYlJP",
    alt: "Confession Schedule",
  },
  other: {
    image: "https://gv0zzhe6ot.ufs.sh/f/qNNctTpmyN4MouryarDFvpgnQWkasj82S6td5AU4DmGhYlJP",
    alt: "Parish Services",
  },
} as const;

