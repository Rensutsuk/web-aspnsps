import Image from "next/image";

export default function MinistriesPage() {
  const ministries = [
    {
      title: "Ministry of Altar Servers",
      description: "Dedicated young individuals who assist the priest during Mass and other liturgical celebrations. They help maintain the sanctity and smooth flow of church ceremonies through their reverent service at the altar.",
      image: "https://picsum.photos/800/600?random=1",
      activities: ["Liturgical Service Training", "Spiritual Formation", "Monthly Meetings", "Annual Retreat"]
    },
    {
      title: "Lectors and Commentators Ministry",
      description: "Proclaiming God's Word and guiding the congregation through the liturgy. This ministry ensures clear and meaningful delivery of Scripture readings and liturgical announcements during Mass.",
      image: "https://picsum.photos/800/600?random=2",
      activities: ["Scripture Reading Workshop", "Voice Training", "Liturgical Formation", "Regular Prayer Meetings"]
    },
    {
      title: "Music Ministry",
      description: "Enhancing liturgical celebrations through sacred music. Our choir members and musicians dedicate their time and talents to lead the congregation in worship through traditional and contemporary Catholic music.",
      image: "https://picsum.photos/800/600?random=3",
      activities: ["Choir Practice", "Music Theory Classes", "Voice Training", "Special Liturgical Celebrations"]
    },
    {
      title: "Extra Ordinary Ministers of Holy Communion",
      description: "Assisting in the distribution of Holy Communion during Mass and bringing the Blessed Sacrament to the sick and homebound members of our community.",
      image: "https://picsum.photos/800/600?random=4",
      activities: ["Eucharistic Formation", "Pastoral Care Training", "Regular Spiritual Retreats", "Communion Service to the Sick"]
    },
    {
      title: "Greeters and Collectors Ministry",
      description: "Welcoming parishioners and visitors with warmth and hospitality, while also facilitating the collection during Mass. They help create a welcoming atmosphere in our church community.",
      image: "https://picsum.photos/800/600?random=5",
      activities: ["Hospitality Training", "Church Protocol Sessions", "Team Building", "Service Scheduling"]
    },
    {
      title: "Mother Butler Guild",
      description: "Dedicated to maintaining the beauty and cleanliness of the church, particularly caring for the altar, sacred vessels, and liturgical vestments. They ensure the dignity of our liturgical celebrations.",
      image: "https://picsum.photos/800/600?random=6",
      activities: ["Altar Preparation", "Vestment Care", "Flower Arrangement", "Church Decoration"]
    },
    {
      title: "Social Communications Ministry",
      description: "Managing the parish's digital presence and communications. This ministry handles social media, website updates, and other forms of communication to keep our community informed and connected.",
      image: "https://picsum.photos/800/600?random=7",
      activities: ["Social Media Management", "Website Maintenance", "Parish Bulletin Production", "Event Documentation"]
    },
    {
      title: "Youth Ministry",
      description: "Empowering young people to live as disciples of Jesus Christ through spiritual formation, community building, and leadership development. Our youth ministry provides a safe and nurturing environment for teens to grow in their faith.",
      image: "https://picsum.photos/800/600?random=10",
      activities: ["Weekly Youth Gatherings", "Annual Youth Camp", "Leadership Training", "Community Service Projects"]
    }
  ];

  return (
    <div className="min-h-screen pt-8">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-16">Our Ministries</h1>
        
        <div className="space-y-24">
          {ministries.map((ministry, index) => (
            <div 
              key={index}
              className={`flex flex-col gap-8 items-center ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}
            >
              <div className="flex-1">
                <div className="max-w-xl mx-auto">
                  <h2 className="text-3xl font-bold mb-4">{ministry.title}</h2>
                  <p className="mb-6 text-base-content/80">{ministry.description}</p>
                  <div className="card bg-base-200">
                    <div className="card-body">
                      <h3 className="card-title text-lg mb-2">Activities</h3>
                      <ul className="list-disc list-inside space-y-1">
                        {ministry.activities.map((activity, idx) => (
                          <li key={idx}>{activity}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <Image
                  src={ministry.image} 
                  alt={ministry.title}
                  className="w-full h-[400px] object-cover rounded-lg shadow-xl"
                  width={800}
                  height={600}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}