'use client';
import { useState } from 'react';
import ServiceCard from '../components/services/ServiceCard';
import { motion, AnimatePresence } from 'framer-motion';
export default function ServicesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 4;
  const services = [
    {
      title: "Baptism",
      shortDescription: "Begin your child's journey in faith through the sacred sacrament of Baptism.",
      description: "Holy Baptism is the basis of the whole Christian life, the gateway to life in the Spirit (vitae spiritualis ianua), and the door which gives access to the other sacraments. Through Baptism we are freed from sin and reborn as sons of God; we become members of Christ, are incorporated into the Church and made sharers in her mission: \"Baptism is the sacrament of regeneration through water in the word.\"",
      requirements: {
        infant02: {
          title: "Infant Baptism (0-2 years)",
          items: [
            "Birth Certificate with registry number (PSA or Local Civil Registry)",
            "Permission letter from your Parish Church (if not a parishioner of NSPS Shrine)",
            "Parents and Godparents must attend the Pre-Baptism seminar",
            "Register at least one week before the day of Baptism"
          ]
        },
        infant36: {
          title: "Child Baptism (3-6 years)",
          items: [
            "Birth Certificate with registry number (PSA or Local Civil Registry)",
            "Certificate of NO BAPTISM from nearby churches where the child resides",
            "Permission letter from your Parish Church (if not a parishioner of NSPS Shrine)",
            "Parents and Godparents must attend the Pre-Baptism seminar",
            "Register at least one week before the day of Baptism"
          ]
        },
        child: {
          title: "Child Baptism (7+ years)",
          items: [
            "Birth Certificate with registry number (PSA or Local Civil Registry)",
            "Certificate of NO BAPTISM from nearby churches where the child resides",
            "Permission letter from your Parish Church (if not a parishioner of NSPS Shrine)",
            "Interview with the Rector/Parish Priest",
            "Must undergo Catechism (Basic Catholic Christian Doctrine)", 
            "Parents and Godparents must attend the Pre-Baptism seminar",
            "Register at least one week before the day of Baptism"
          ]
        }
      },
      schedules: {
        group: {
          title: "Group Baptism",
          schedule: "Every Sunday @ 11:00am",
          seminar: "Sunday @ 9:30am",
          donation: "Any amount, plus P100 per additional sponsor, P120 with candle"
        },
        special: {
          title: "Special/Individual Baptism",
          schedule: "Tuesday to Saturday by appointment",
          seminar: "1 hour before the set time and date of baptism",
          donation: "P1,500 plus P100 per additional sponsor, P120 with candle"
        }
      },
      reminders: [
        "Please register at least one week before the day of Baptism",
        "Bring the original Birth certificate and photocopy/xerox upon registering",
        "Godparents must be baptized and confirmed Catholic, not less than 16 years of age",
        "Parents and Godparents must attend the Pre-Baptism seminar",
        "Latecomers will be rescheduled - No Pre-Baptism Seminar, No Baptism",
        "Please wear proper Church attire (no shorts & no sleeveless)"
      ],
      contactInfo: "Please contact the Parish Office for more information and registration.",
      image: "https://gv0zzhe6ot.ufs.sh/f/qNNctTpmyN4MDdJ4U8IT8LqmsZi6thfWXR5ldxIYOU1VAQb3"
    },
    {
      title: "Releasing Documents",
      shortDescription: "Request official church certificates and documents for sacramental records.",
      description: "The Parish Office provides official certificates for sacraments received at our church, including Baptism, Confirmation, Marriage, and Death certificates. These documents are often required for receiving other sacraments, school enrollment, or legal purposes.",
      requirements: {
        baptismal: {
          title: "Baptismal Certificate",
          items: [
            "Valid ID of the requestor",
            "Full name of the person in the certificate",
            "Approximate date of baptism",
            "Parents' complete names",
            "Purpose of the certificate (for annotation)"
          ]
        },
        confirmation: {
          title: "Confirmation Certificate",
          items: [
            "Valid ID of the requestor",
            "Full name of the person in the certificate",
            "Approximate date of confirmation",
            "Parents' complete names",
            "Purpose of the certificate"
          ]
        },
        marriage: {
          title: "Marriage Certificate",
          items: [
            "Valid ID of the requestor (must be one of the spouses or an immediate family member)",
            "Complete names of both spouses",
            "Approximate date of marriage",
            "Purpose of the certificate"
          ]
        },
        death: {
          title: "Death Certificate",
          items: [
            "Valid ID of the requestor (must be an immediate family member)",
            "Complete name of the deceased",
            "Approximate date of death/funeral Mass",
            "Purpose of the certificate"
          ]
        }
      },
      reminders: [
        "Please bring a valid ID when requesting certificates",
        "For certificates with annotations (e.g., for marriage purposes), please specify when requesting",
        "For certificates from other parishes, please contact that specific parish directly",
        "Authorized representatives must present an authorization letter and valid ID"
      ],
      contactInfo: "For document requests, please visit the Parish Office or call (123) 456-7895 during office hours.",
      image: "https://gv0zzhe6ot.ufs.sh/f/qNNctTpmyN4Muld8mTytIDoBjJxUblWz0sKTOdm7Vr8fYgeS"
    },
    {
      title: "Funeral Mass",
      shortDescription: "Honor and commemorate your loved ones.",
      description: "At the death of a Christian, whose life of faith was begun in the waters of baptism and strengthened at the eucharistic table, the Church intercedes on behalf of the deceased because of its confident belief that death is not the end nor does it break the bonds forged in life. The Church also ministers to the sorrowing and consoles them in the funeral rites with the comforting word of God and the sacrament of the eucharist.",
      requirements: [],
      contactInfo: "For immediate assistance, please contact our Parish Office 24/7 at (123) 456-7892",
      image: "https://gv0zzhe6ot.ufs.sh/f/qNNctTpmyN4MIs8U1BV1g5UAuSbTnfMpkq496XaN8eK2d3mi"
    },
    {
      title: "House Blessing",
      shortDescription: "Invite God's presence and blessing into your home through this meaningful Catholic tradition.",
      description: "House blessings are a way to sanctify our homes and dedicate them to God's purposes. This tradition helps make our homes places of prayer and peace.",
      requirements: [],
      contactInfo: "To schedule a house blessing, contact the Parish Office at (123) 456-7893",
      image: "https://gv0zzhe6ot.ufs.sh/f/qNNctTpmyN4MHyTgDSs7GSuO350hliR2PAUkwfTqjWtKgBIo"
    },
    {
      title: "Sick Call",
      shortDescription: "Request pastoral care and sacraments for those who are ill or homebound.",
      description: "Our parish provides spiritual support and sacramental care for those who are sick, elderly, or unable to attend Mass. A priest can visit to offer prayers, anointing of the sick, and Holy Communion.",
      requirements: [
        "Name and condition of the person",
        "Complete address and contact information",
        "Best time for visitation",
        "Immediate family member's consent"
      ],
      contactInfo: "For urgent sick calls, please contact our Parish Office at (123) 456-7894",
      image: "https://gv0zzhe6ot.ufs.sh/f/qNNctTpmyN4MjaX1IVgi69LvoVgucWKqGERr5ebMafhI70HY"
    }
  ];

  // Calculate pagination
  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = services.slice(indexOfFirstService, indexOfLastService);
  const totalPages = Math.ceil(services.length / servicesPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-base-100 pt-8">
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-center mb-16">Church Services</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 min-h-[calc(100vh-20rem)]">
          <AnimatePresence mode="wait">
            {currentServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <ServiceCard
                  key={service.title}
                  title={service.title}
                  shortDescription={service.shortDescription}
                  description={service.description}
                  requirements={service.requirements as any}
                  schedules={service.schedules as any}
                  reminders={service.reminders}
                  contactInfo={service.contactInfo}
                  image={service.image}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center gap-2">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="btn btn-circle btn-outline transition-transform duration-200 hover:scale-110 disabled:scale-100"
          >
            «
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`btn btn-circle transition-all duration-200 hover:scale-110 ${currentPage === number
                  ? 'btn-primary scale-110 shadow-lg'
                  : 'btn-outline hover:shadow-md'
                }`}
            >
              {number}
            </button>
          ))}

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="btn btn-circle btn-outline transition-transform duration-200 hover:scale-110 disabled:scale-100"
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
}