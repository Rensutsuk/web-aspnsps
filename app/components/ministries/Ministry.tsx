'use client'

import MinistryCard from "./MinistryCard";

export default function MinistriesPage() {
  const ministries = [
    {
      title: "Ministry of Altar Servers",
      description: "Primarily composed of boys who have received their First Communion, Altar servers assist the priest and deacons during Mass and other liturgical functions by preparing the altar, holding the Roman Missal, carrying the cross, candles, and incense, and responding to the needs of the celebrant.",
      fullDescription: "Primarily composed of boys who have received their First Communion, Altar servers assist the priest and deacons during Mass and other liturgical functions by preparing the altar, holding the Roman Missal, carrying the cross, candles, and incense, and responding to the needs of the celebrant.",
      image: "https://gv0zzhe6ot.ufs.sh/f/qNNctTpmyN4MjwK83ngi69LvoVgucWKqGERr5ebMafhI70HY",
      activities: ["Liturgical Service Training", "Spiritual Formation", "Monthly Meetings"]
    },
    {
      title: "Lectors and Commentators Ministry",
      description: "This ministry is composed of parishioners trained and entrusted to proclaim the Word of God during the Liturgy of the Word. Lectors bring the Scriptures to life by reading with clarity, understanding, and conviction. Commentators, meanwhile, guide the congregation through the different parts of the Mass, ensuring active and informed participation.",
      fullDescription: "This ministry is composed of parishioners trained and entrusted to proclaim the Word of God during the Liturgy of the Word. Lectors bring the Scriptures to life by reading with clarity, understanding, and conviction. Commentators, meanwhile, guide the congregation through the different parts of the Mass, ensuring active and informed participation.",
      image: "https://gv0zzhe6ot.ufs.sh/f/qNNctTpmyN4Mo3gaigDFvpgnQWkasj82S6td5AU4DmGhYlJP",
      activities: ["Scripture Reading Workshop", "Voice Training", "Liturgical Formation", "Regular Prayer Meetings"]
    },
    {
      title: "Music Ministry",
      description: "The Music Ministry leads the liturgical assembly in song, enhancing the celebration of the Eucharist and other sacraments through sacred music. Drawing from the Church’s rich musical heritage, members prepare hymns and responses appropriate to each liturgical season and celebration.",
      fullDescription: "The Music Ministry leads the liturgical assembly in song, enhancing the celebration of the Eucharist and other sacraments through sacred music. Drawing from the Church’s rich musical heritage, members prepare hymns and responses appropriate to each liturgical season and celebration.",
      image: "https://gv0zzhe6ot.ufs.sh/f/qNNctTpmyN4MvNGQSgtLotzC8HpchI9qQ54wPJ7uVRb31gK0",
      activities: ["Choir Practice", "Music Theory Classes", "Voice Training", "Special Liturgical Celebrations"]
    },
    {
      title: "Extraordinary Ministers of Holy Communion",
      description: "The Extraordinary Ministers of Holy Communion are laypersons commissioned to assist in the distribution of the Holy Eucharist during Mass and to the Sick. This ministry requires deep reverence, a solid understanding of the Eucharist, and a commitment to pastoral care.",
      fullDescription: "The Extraordinary Ministers of Holy Communion are laypersons commissioned to assist in the distribution of the Holy Eucharist during Mass and to the Sick. This ministry requires deep reverence, a solid understanding of the Eucharist, and a commitment to pastoral care.",
      image: "https://gv0zzhe6ot.ufs.sh/f/qNNctTpmyN4Mcjr1n7Zu0PfDC8YWtVk2nQaTg4wx9bE3SyAX",
      activities: ["Eucharistic Formation", "Pastoral Care Training", "Regular Spiritual Retreats", "Communion Service to the Sick"]
    },
    {
      title: "Greeters and Collectors Ministry",
      description: "Greeters welcome parishioners and visitors with warmth and kindness, offering assistance when needed. Collectors, on the other hand, ensure the reverent and organized collection of offerings during Mass, helping manage the flow of congregants and contributing to the dignity of the liturgical celebration.",
      fullDescription: "Greeters welcome parishioners and visitors with warmth and kindness, offering assistance when needed. Collectors, on the other hand, ensure the reverent and organized collection of offerings during Mass, helping manage the flow of congregants and contributing to the dignity of the liturgical celebration.",
      image: "/img/ministry/gcm.jpg",
      activities: ["Hospitality Training", "Church Protocol Sessions"]
    },
    {
      title: "Mother Butler Guild",
      description: "The Mother Butler Guild takes charge of preparing and maintaining the altar linens, vestments, sacred vessels, and decorations. Often working quietly behind the scenes, they ensure the sanctuary remains clean, orderly, and worthy of the liturgy. Their service reflects the dignity of the Church and honors the sacred spaces where Christ is present.",
      fullDescription: "The Mother Butler Guild takes charge of preparing and maintaining the altar linens, vestments, sacred vessels, and decorations. Often working quietly behind the scenes, they ensure the sanctuary remains clean, orderly, and worthy of the liturgy. Their service reflects the dignity of the Church and honors the sacred spaces where Christ is present.",
      image: "/img/ministry/mbg.jpg",
      activities: ["Altar Preparation", "Vestment Care", "Flower Arrangement", "Church Decoration"]
    },
    {
      title: "Liturgical Arts and Shrine Heritage",
      description: "This ministry is responsible for preserving the beauty and solemnity of the shrine through sacred art, liturgical design, and the promotion of cultural heritage. It oversees the design and maintenance of liturgical spaces, vestments, icons, and visual elements that express the mystery of faith.",
      fullDescription: "This ministry is responsible for preserving the beauty and solemnity of the shrine through sacred art, liturgical design, and the promotion of cultural heritage. It oversees the design and maintenance of liturgical spaces, vestments, icons, and visual elements that express the mystery of faith.",
      image: "https://picsum.photos/800/600?random=10",
      activities: ["Shrine Design", "Liturgical Space Decoration", "Cultural Heritage Promotion"]
    },
    {
      title: "Social Communications Ministry",
      description: "The Social Communications Ministry serves as the voice of the parish in the digital age. It manages communication platforms—such as parish websites, social media, newsletters, and visual displays—to share announcements, document parish events, and disseminate Church teachings, through photography, videography, writing, and online engagement.",
      fullDescription: "The Social Communications Ministry serves as the voice of the parish in the digital age. It manages communication platforms—such as parish websites, social media, newsletters, and visual displays—to share announcements, document parish events, and disseminate Church teachings, through photography, videography, writing, and online engagement.",
      image: "/img/ministry/socom.jpg",
      activities: ["Social Media Management", "Website Maintenance", "Parish Bulletin Production", "Event Documentation"]
    },
    {
      title: "Youth Ministry",
      description: "The PYM is the official youth arm of the parish with the mission to nurture the spiritual life of the youth and equip them for active involvement in Church and society through spiritual formation, peer gatherings, outreach programs, and involvement in parish activities.",
      fullDescription: "The PYM is the official youth arm of the parish with the mission to nurture the spiritual life of the youth and equip them for active involvement in Church and society through spiritual formation, peer gatherings, outreach programs, and involvement in parish activities.",
      image: "https://picsum.photos/800/600?random=10",
      activities: ["Weekly Youth Gatherings", "Annual Youth Camp", "Leadership Training", "Community Service Projects"]
    },
    {
      title: "Family and Life Ministry",
      description: "Committed to upholding the dignity of life and the sanctity of marriage and the family, this ministry offers formation programs, counseling, retreats, and advocacy work. It supports couples preparing for marriage, assists families in crisis, and promotes Church teachings on sexuality, parenthood, and respect for life from conception to natural death.",
      fullDescription: "Committed to upholding the dignity of life and the sanctity of marriage and the family, this ministry offers formation programs, counseling, retreats, and advocacy work. It supports couples preparing for marriage, assists families in crisis, and promotes Church teachings on sexuality, parenthood, and respect for life from conception to natural death.",
      image: "https://picsum.photos/800/600?random=7",
      activities: ["Family Formation", "Couple Counseling", "Retreats", "Advocacy Work"]
    },
    {
      title: "Biblical Apostolate",
      description: "The Biblical Apostolate encourages the prayerful reading, study, and sharing of the Word of God. Through Bible study groups, lectio divina, scripture reflections, and catechetical sessions, members help deepen the community’s understanding of the Scriptures. The apostolate fosters love for the Bible as a source of guidance, inspiration, and spiritual nourishment for everyday Christian life.",
      fullDescription: "The Biblical Apostolate encourages the prayerful reading, study, and sharing of the Word of God. Through Bible study groups, lectio divina, scripture reflections, and catechetical sessions, members help deepen the community’s understanding of the Scriptures. The apostolate fosters love for the Bible as a source of guidance, inspiration, and spiritual nourishment for everyday Christian life.",
      image: "https://picsum.photos/800/600?random=7",
      activities: ["Bible Study Groups", "Lectio Divina", "Scripture Reflections", "Catechetical Sessions"]
    },
    {
      title: "Ministry on Ecology",
      description: "This ministry leads the parish in promoting care for creation. It conducts educational campaigns, coordinates eco-friendly practices, and implements parish-based environmental projects. Rooted in Catholic social teaching and Laudato Si’, it encourages parishioners to see environmental stewardship as a moral and spiritual responsibility.",
      fullDescription: "This ministry leads the parish in promoting care for creation. It conducts educational campaigns, coordinates eco-friendly practices, and implements parish-based environmental projects. Rooted in Catholic social teaching and Laudato Si’, it encourages parishioners to see environmental stewardship as a moral and spiritual responsibility.",
      image: "https://picsum.photos/800/600?random=7",
      activities: ["Eco-Friendly Practices", "Environmental Projects", "Education Campaigns"]
    },
    {
      title: "Parish Lay Health Care Ministry",
      description: "This pastoral health care ministry brings compassion and care to the sick, elderly, and those in need within the parish community. Members provide health education, simple medical checkups, and referrals, and assist in sacramental preparation for the anointing of the sick. They serve as a bridge between the Church’s mission and the healing presence of Christ.",
      fullDescription: "This pastoral health care ministry brings compassion and care to the sick, elderly, and those in need within the parish community. Members provide health education, simple medical checkups, and referrals, and assist in sacramental preparation for the anointing of the sick. They serve as a bridge between the Church’s mission and the healing presence of Christ.",
      image: "https://picsum.photos/800/600?random=7",
      activities: ["Health Education", "Simple Medical Checkups", "Referrals", "Sacramental Preparation"]
    },
    {
      title: "Livelihood Ministry | Pondo ng Pinoy",
      description: "The Livelihood Ministry supports livelihood programs that provide families with sustainable means of income, through assistance in setting up own small businesses or finding employment in other companies. Rooted in charity and empowerment, the ministry enables the parish to become a community of solidarity and practical support for those in need.",
      fullDescription: "The Livelihood Ministry supports livelihood programs that provide families with sustainable means of income, through assistance in setting up own small businesses or finding employment in other companies. Rooted in charity and empowerment, the ministry enables the parish to become a community of solidarity and practical support for those in need.",
      image: "https://picsum.photos/800/600?random=7",
      activities: ["Livelihood Support", "Charity Programs", "Empowerment Workshops"]
    },
    {
      title: "Shrine Ministry for Persons with Disability",
      description: "This ministry ensures that persons with disabilities are not only accommodated but also embraced and empowered within the Church. It advocates for accessibility, provides catechesis and pastoral care tailored to their needs, and encourages active participation in liturgical and parish life. It affirms the dignity and gifts of every person, regardless of ability.",
      fullDescription: "This ministry ensures that persons with disabilities are not only accommodated but also embraced and empowered within the Church. It advocates for accessibility, provides catechesis and pastoral care tailored to their needs, and encourages active participation in liturgical and parish life. It affirms the dignity and gifts of every person, regardless of ability.",
      image: "https://picsum.photos/800/600?random=7",
      activities: ["Livelihood Support", "Charity Programs", "Empowerment Workshops"]
    },
    {
      title: "Hijos in the Service of Maria",
      description: "The Hijos in the Service of Maria serves as a vital support team during shrine events and celebrations. They help manage traffic, coordinate security, and maintain order, especially during high-attendance days and processions. As a group, the Hijos is dedicated to deepening devotion to Our Mother of Perpetual Help, fostering a greater sense of responsibility, and nurturing love for the Church.",
      fullDescription: "The Hijos in the Service of Maria serves as a vital support team during shrine events and celebrations. They help manage traffic, coordinate security, and maintain order, especially during high-attendance days and processions. As a group, the Hijos is dedicated to deepening devotion to Our Mother of Perpetual Help, fostering a greater sense of responsibility, and nurturing love for the Church.",
      image: "https://picsum.photos/800/600?random=7",
      activities: ["Traffic Management", "Security Coordination", "Order Maintenance"]
    },
    {
      title: "Parish Pastoral Council for Responsible Voting",
      description: "The Parish Pastoral Council for Responsible Voting educates the faithful on their civic duties. It promotes voter education, awareness of political issues, and moral discernment based on Gospel values. During election periods, it may serve as a watchdog to ensure clean and honest elections, echoing the Church’s mission to promote justice and the common good.",
      fullDescription: "The Parish Pastoral Council for Responsible Voting educates the faithful on their civic duties. It promotes voter education, awareness of political issues, and moral discernment based on Gospel values. During election periods, it may serve as a watchdog to ensure clean and honest elections, echoing the Church’s mission to promote justice and the common good.",
      image: "https://picsum.photos/800/600?random=7",
      activities: ["Voter Education", "Awareness of Political Issues", "Moral Discernment"]
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-16 text-primary">Ministries and Apostolates</h1>      
      </div>

      <MinistryCard ministries={ministries} />

      <div className="flex flex-col max-w-md center mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Join a Ministry</h1>
        <button
          className="btn btn-primary btn-lg shadow-lg"
          onClick={() => (document.getElementById('join_ministry_modal') as HTMLDialogElement)?.showModal()}
        >
          Apply Here
        </button>
      </div>

      <dialog id="join_ministry_modal" className="modal">
        <div className="modal-box w-11/12 max-w-5xl h-[90vh] overflow-y-auto">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-10">✕</button>
          </form>
          <iframe
            className="w-full h-full"
            src="https://docs.google.com/forms/d/e/1FAIpQLSdJzRlBDTWsfZjpqkkrj7zS0XBZ2U08kCS2atzM3mIIuAligQ/viewform?embedded=true"
            style={{
              minHeight: '80vh',
              maxHeight: '85vh'
            }}
          >Loading…</iframe>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => (document.getElementById('join_ministry_modal') as HTMLDialogElement)?.close()}>close</button>
        </form>
      </dialog>
    </div>
  );
}