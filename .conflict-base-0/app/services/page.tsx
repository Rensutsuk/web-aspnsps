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
      description: "The Sacrament of Baptism is the first step in a lifelong journey of commitment and discipleship. Whether we are baptized as infants or adults, Baptism is the Church's way of celebrating and enacting the embrace of God.",
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
          seminar: "Sunday @ 9:00am",
          donation: "P1,200 plus P100 per additional sponsor, P120 with candle"
        },
        special: {
          title: "Special/Individual Baptism",
          schedule: "Tuesday to Saturday by appointment",
          seminar: "30 minutes before the set time and date of baptism",
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
      image: "https://picsum.photos/600/800?random=1"
    },
    {
      title: "Wedding",
      shortDescription: "Celebrate the sacred bond of marriage in the presence of God and your loved ones in our beautiful church.",
      description: "The Sacrament of Marriage is a covenant, which is more than a contract. Through the Sacrament of Matrimony, the Church teaches that Jesus Christ has elevated the love between a man and woman to a new level.",
      requirements: {
        regular: {
          title: "Regular Marriage Requirements",
          items: [
            "Marriage License",
            "Baptismal and Confirmation Certificates with annotation 'For Marriage Purposes' (newly issued)",
            "PSA Certificate of Live Birth",
            "PSA Certificate of No Marriage (CENOMAR)",
            "Canonical Interview - by appointment",
            "Pre-Cana/Marriage Preparation Seminar - to be scheduled",
            "Marriage Banns with permission if the bride belongs to another parish",
            "List of Principal Sponsors"
          ]
        },
        civillyMarried: {
          title: "For Civilly Married Couples",
          items: [
            "Certified True Copy of Marriage Contract (PSA)",
            "Baptismal and Confirmation Certificates with annotation 'For Marriage Purposes' (newly issued)",
            "PSA Certificate of Live Birth",
            "Canonical Interview - by appointment",
            "Pre-Cana/Marriage Preparation Seminar - to be scheduled",
            "Marriage Banns with permission if the bride belongs to another parish",
            "List of Principal Sponsors"
          ]
        },
        cohabiting: {
          title: "For Couples Living Together (5+ years)",
          items: [
            "Affidavit of Cohabitant (written statement under oath of living together as husband and wife for at least 5 years)",
            "Baptismal and Confirmation Certificates with annotation 'For Marriage Purposes' (newly issued)",
            "PSA Certificate of Live Birth",
            "PSA Certificate of No Marriage (CENOMAR)",
            "Canonical Interview - by appointment",
            "Marriage Banns with permission if the bride belongs to another parish",
            "Pre-Cana/Marriage Preparation Seminar - to be scheduled",
            "List of Principal Sponsors"
          ]
        },
        foreignMarriage: {
          title: "Marriage with Foreign National",
          items: [
            "Clearance from the Chancery Office of the Archdiocese of Manila",
            "Located at: 121 Arzobispado St., Intramuros, Manila",
            "Contact: Tel. No. 8527-3955 / 8527-7631-36",
            "All other regular marriage requirements also apply"
          ]
        }
      },
      contactInfo: "For wedding inquiries, please contact our Wedding Coordinator at (123) 456-7891 or wedding@parish.com",
      image: "https://picsum.photos/600/800?random=2"
    },
    {
      title: "Funeral Mass",
      shortDescription: "Honor and commemorate your loved ones with a dignified Catholic funeral service.",
      description: "The Catholic funeral rites are a way for the Church to offer worship, praise, and thanksgiving to God for the gift of a life which has now been returned to Him.",
      requirements: [
        "Death Certificate",
        "Proof of Catholic faith of the deceased",
        "Contact parish immediately after death"
      ],
      contactInfo: "For immediate assistance, please contact our Parish Office 24/7 at (123) 456-7892",
      image: "https://picsum.photos/600/800?random=3"
    },
    {
      title: "House Blessing",
      shortDescription: "Invite God's presence and blessing into your home through this meaningful Catholic tradition.",
      description: "House blessings are a way to sanctify our homes and dedicate them to God's purposes. This tradition helps make our homes places of prayer and peace.",
      requirements: [
        "Schedule appointment",
        "Prepare holy water container (optional)",
        "Gather family members if possible"
      ],
      contactInfo: "To schedule a house blessing, contact the Parish Office at (123) 456-7893",
      image: "https://picsum.photos/600/800?random=4"
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
      image: "https://picsum.photos/600/800?random=5"
    },
    {
      title: "Counseling",
      shortDescription: "Seek spiritual guidance and pastoral counseling from our parish priests.",
      description: "Our parish offers pastoral counseling services to help individuals and families navigate life's challenges through spiritual guidance and support.",
      requirements: [
        "Advance appointment required",
        "Initial consultation form",
        "Parish registration (for regular counseling)",
        "Maintain confidentiality agreement"
      ],
      contactInfo: "To schedule a counseling session, please contact our Parish Office at (123) 456-7895",
      image: "https://picsum.photos/600/800?random=6"
    },
    {
      title: "Street Mass",
      shortDescription: "Bring the celebration of the Holy Mass to your local community.",
      description: "Street Masses help bring the Church closer to the community, allowing those who might not regularly attend Mass to participate in the celebration of the Eucharist in their own neighborhood.",
      requirements: [
        "Written request from the community leader",
        "Proposed date and time",
        "Location assessment",
        "Minimum number of participating families",
        "Basic altar setup requirements"
      ],
      contactInfo: "To request a Street Mass, please contact our Parish Office at (123) 456-7896",
      image: "https://picsum.photos/600/800?random=7"
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
                <ServiceCard {...service} />
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
              className={`btn btn-circle transition-all duration-200 hover:scale-110 ${
                currentPage === number 
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