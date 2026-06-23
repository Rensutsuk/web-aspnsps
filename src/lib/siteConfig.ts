export const siteConfig = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXTAUTH_URL || "http://localhost:3000",
  parishNameShort: "ASPNSPS",
  parishNameFull:
    "Archdiocesan Shrine and Parish of Nuestra Señora del Perpetuo Socorro",
  contact: {
    address: {
      line1: "2042 Calamba cor. Instruccion Street",
      line2: "Sampaloc, Manila",
    },
    phone: "8741-8010",
    email: "nsps_parish@yahoo.com",
    officeHours: [
      {
        label: "Tuesday - Sunday",
        badge: "Weekdays",
        slots: ["Morning: 8:00 AM - 12:00 PM", "Afternoon: 2:00 PM - 6:00 PM"],
      },
      {
        label: "Monday",
        badge: "Closed",
        slots: ["Office is closed for administrative work"],
      },
    ],
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d634.9244505982665!2d120.99152954538765!3d14.62210283546029!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b6085d63588b%3A0xc7ac4767652ee41b!2sNuestra%20Se%C3%B1ora%20del%20Perpetuo%20Socorro%20Parish%20(Archdiocese%20of%20Manila)!5e0!3m2!1sen!2sph!4v1741163032322!5m2!1sen!2sph",
    mapExternalUrl:
      "https://maps.google.com/?q=2042+Calamba+cor.+Instruccion+Street,+Sampaloc,+Manila",
  },
  links: {
    facebook: "https://www.facebook.com/aspnspsofficial",
    instagram: "https://instagram.com/aspnspsofficial",
    tiktok: "https://tiktok.com/@aspnspsofficial",
    youtube: "",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "Mass Schedule", href: "/schedule" },
    { label: "Services", href: "/services" },
    { label: "Marriage", href: "/marriage" },
    { label: "Ministries", href: "/ministries" },
    { label: "Contact", href: "/contact" },
  ],
} as const;
