'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaClock, FaPray, FaChurch } from 'react-icons/fa';
import Image from 'next/image';

export default function MassSchedulePage() {
  const [activeTab, setActiveTab] = useState('Mass');

  const tabs = ['Mass', 'Confession', 'Other'];

  const massSchedules = [
    { day: 'Sunday', times: ['6:00 AM', '7:00 AM', '8:30 AM', '10:00 AM', '12:15 PM', '4:00 PM', '5:30 PM', '7:00 PM'] },
    { day: 'Monday', times: ['6:00 AM', '6:00 PM'] },
    { day: 'Tuesday', times: ['6:00 AM', '6:00 PM'] },
    { day: 'Wednesday', times: ['6:30 AM', '12:15 PM', '6:00 PM'] },
    { day: 'Thursday', times: ['6:00 AM', '6:00 PM'] },
    { day: 'Friday', times: ['6:00 AM', '6:00 PM'] },
    { day: 'Saturday', times: ['6:00 AM', '6:00 PM'] },
  ];

  const confessionSchedules = [
    { day: 'Wednesday', times: ['5:30 PM - 6:00 PM'] },
    { day: 'Friday', times: ['5:30 PM - 6:00 PM'] },
    { day: 'Saturday', times: ['5:30 PM - 6:00 PM'] },
  ];

  const otherServices = [
    {
      title: 'Holy Hour',
      icon: <FaPray className="text-2xl" />,
      schedules: [
        { day: 'Wednesdays', times: ['5:00 PM - 6:00 PM'] },
        { day: 'First Friday', times: ['5:00 PM - 6:00 PM'] },
      ],
    },
    {
      title: 'Rosary',
      icon: <FaChurch className="text-2xl" />,
      schedules: [{ day: 'Daily', times: ['5:45 PM'] }],
    },
    {
      title: 'Morning and Evening Prayer',
      icon: <FaClock className="text-2xl" />,
      schedules: [{ day: 'Weekdays', times: ['15 minutes before mass'] }],
    },
  ];

  const tabVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  return (
    <div className="min-h-content py-16 pt-24 bg-base-100">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-10">Schedule of Services</h1>

        {/* Tab Headers */}
        <div className="tabs justify-center mb-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`tab tab-bordered text-lg ${activeTab === tab ? 'tab-active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'Mass' && (
            <motion.div
              key="Mass"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={tabVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {massSchedules.map((schedule, i) => (
                <div key={schedule.day} className="card bg-base-200 shadow-md">
                  <figure>
                    <Image
                      src={`https://picsum.photos/400/200?random=${i + 1}`}
                      alt={`Mass on ${schedule.day}`}
                      width={400}
                      height={200}
                      className="w-full object-cover"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{schedule.day}</h2>
                    <ul className="mt-2 grid grid-cols-2 gap-4">
                      {schedule.times.map((time) => (
                        <li key={time} className="flex items-center gap-2">
                          <FaClock className="text-primary" />
                          {time}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'Confession' && (
            <motion.div
              key="Confession"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={tabVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {confessionSchedules.map((schedule, i) => (
                <div key={schedule.day} className="card bg-base-200 shadow-md">
                  <figure>
                    <Image
                      src={`https://picsum.photos/400/200?grayscale&random=${i + 10}`}
                      alt={`Confession on ${schedule.day}`}
                      width={400}
                      height={200}
                      className="w-full object-cover"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{schedule.day}</h2>
                    <ul className="space-y-2 mt-2">
                      {schedule.times.map((time) => (
                        <li key={time} className="flex items-center gap-2">
                          <FaClock className="text-primary" />
                          {time}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'Other' && (
            <motion.div
              key="Other"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={tabVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {otherServices.map((service, i) => (
                <div key={service.title} className="card bg-base-200 shadow-md">
                  <figure>
                    <Image
                      src={`https://picsum.photos/400/200?blur=1&random=${i + 20}`}
                      alt={service.title}
                      width={400}
                      height={200}
                      className="w-full object-cover"
                    />
                  </figure>
                  <div className="card-body">
                    <div className="flex items-center gap-3 mb-2">
                      {service.icon}
                      <h2 className="card-title">{service.title}</h2>
                    </div>
                    {service.schedules.map((schedule) => (
                      <div key={schedule.day} className="mb-3">
                        <p className="font-semibold">{schedule.day}</p>
                        <ul className="space-y-1">
                          {schedule.times.map((time) => (
                            <li key={time} className="flex items-center gap-2">
                              <FaClock className="text-primary" />
                              {time}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}