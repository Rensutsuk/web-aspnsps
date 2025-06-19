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
    <div className="min-h-screen pt-16 bg-gradient-to-br from-base-200 to-base-100">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-16 text-primary">Our Ministries</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ministries.map((ministry, index) => (
            <div 
              key={index}
              className="group perspective">
              <div className="relative transform-style-3d transition-transform duration-1000 group-hover:rotate-y-180">
                {/* Front of the card */}
                <div className="backface-hidden">
                  <div className="h-[450px] bg-base-100 rounded-xl shadow-2xl overflow-hidden">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={ministry.image}
                        alt={ministry.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                        width={800}
                        height={600}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-base-100 to-transparent opacity-60"></div>
                    </div>
                    <div className="p-6">
                      <h2 className="text-2xl font-bold mb-3 text-primary">{ministry.title}</h2>
                      <p className="text-base-content/80 line-clamp-4">{ministry.description}</p>
                    </div>
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                      <span className="text-sm text-primary-content/60 group-hover:text-primary-content/80 transition-colors duration-300">
                        Hover to see activities
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Back of the card */}
                <div className="absolute inset-0 backface-hidden rotate-y-180">
                  <div className="h-[450px] bg-primary text-primary-content rounded-xl shadow-2xl p-6 flex flex-col">
                    <h3 className="text-2xl font-bold mb-6 text-center">Activities</h3>
                    <ul className="space-y-4 flex-grow">
                      {ministry.activities.map((activity, idx) => (
                        <li 
                          key={idx}
                          className="flex items-center space-x-3 opacity-0 animate-fade-in"
                          style={{ animationDelay: `${idx * 150}ms` }}
                        >
                          <span className="w-2 h-2 bg-primary-content rounded-full"></span>
                          <span>{activity}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="text-center mt-4">
                      <span className="text-sm opacity-60">
                        Click to flip back
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}