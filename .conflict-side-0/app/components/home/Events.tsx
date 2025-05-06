'use client';
import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Events() {
  const upcomingEvents = [
    {
      title: "Easter Sunday Mass",
      date: "March 31, 2024",
      time: "6:00 AM - 7:30 AM",
      description: "Join us for the celebration of the Resurrection of our Lord.",
      category: "Mass",
      link: "/events/easter-sunday-2024"
    },
    {
      title: "First Communion Preparation",
      date: "April 6, 2024",
      time: "9:00 AM - 11:00 AM",
      description: "Preparation classes for children receiving their First Holy Communion.",
      category: "Formation",
      link: "/events/first-communion-prep-2024"
    },
    {
      title: "Parish Festival",
      date: "April 13, 2024",
      time: "10:00 AM - 8:00 PM",
      description: "Annual parish festival featuring food, games, and community activities.",
      category: "Community",
      link: "/events/parish-festival-2024"
    },
    {
      title: "Parish Festival",
      date: "April 13, 2024",
      time: "10:00 AM - 8:00 PM",
      description: "Annual parish festival featuring food, games, and community activities.",
      category: "Community",
      link: "/events/parish-festival-2024"
    },
    {
      title: "Parish Festival",
      date: "April 13, 2024",
      time: "10:00 AM - 8:00 PM",
      description: "Annual parish festival featuring food, games, and community activities.",
      category: "Community",
      link: "/events/parish-festival-2024"
    },
    {
      title: "Youth Ministry Meeting",
      date: "April 20, 2024",
      time: "2:00 PM - 4:00 PM",
      description: "Monthly gathering for young people ages 13-21.",
      category: "Youth",
      link: "/events/youth-ministry-april-2024"
    }
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 4;
  const totalPages = Math.ceil(upcomingEvents.length / eventsPerPage);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = upcomingEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="py-16 bg-base-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Upcoming Events</h2>
        {upcomingEvents.length > 0 ? (
          <>
            <motion.div 
              key={currentPage} // Add key to force re-render on page change
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {currentEvents.map((event, index) => (
                <motion.div
                  key={`${currentPage}-${index}`} // Updated key to be unique per page
                  variants={item}
                  className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow"
                >
                  <div className="card-body">
                    <div className="badge badge-primary mb-2">{event.category}</div>
                    <h3 className="card-title text-lg">{event.title}</h3>
                    <div className="text-sm opacity-70">
                      <p>{event.date}</p>
                      <p>{event.time}</p>
                    </div>
                    <p className="mt-2 text-sm">{event.description}</p>
                    <div className="card-actions justify-end mt-4">
                      <a href={event.link} className="btn btn-outline btn-sm">Learn More</a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button 
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="btn btn-circle btn-sm"
                >
                  <FaChevronLeft />
                </button>
                
                <div className="join">
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => paginate(index + 1)}
                      className={`btn btn-sm join-item ${
                        currentPage === index + 1 ? 'btn-primary' : ''
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                <button 
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="btn btn-circle btn-sm"
                >
                  <FaChevronRight />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4 opacity-30">📅</div>
            <h3 className="text-2xl font-bold mb-2">No Upcoming Events</h3>
            <p className="text-base-content/70">
              Check back soon for new events and activities!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}