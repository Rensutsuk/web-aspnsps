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
      title: 'Wednesday Devotion to our Mother of Perpetual Help',
      icon: <FaPray className="text-2xl" />,
      image: 'https://gv0zzhe6ot.ufs.sh/f/qNNctTpmyN4Mr0o9yb2k1SpQGxfEXm9i8TetMBIULur6dZVH',
      schedules: [
        { day: 'Wednesdays', times: ['5:50 AM - 6:15AM', '11:45 AM - 12:15 PM', '5:00 PM - 6:00 PM'] },
      ],
    },
    {
      title: 'Holy Hour',
      icon: <FaPray className="text-2xl" />,
      image: 'https://gv0zzhe6ot.ufs.sh/f/qNNctTpmyN4Mts4LPR8g6OJa93jKWYuyGorq1AxzPRFMeBEc',
      schedules: [
        { day: 'Wednesdays', times: ['5:00 PM - 6:00 PM'] },
        { day: 'First Friday', times: ['5:00 PM - 6:00 PM'] },
      ],
    },
    {
      title: 'Rosary',
      icon: <FaChurch className="text-2xl" />,
      image: 'https://gv0zzhe6ot.ufs.sh/f/qNNctTpmyN4M0fqdDkNdQm8MAPFokJxzC2Ve5ctlRUWaSyGY',
      schedules: [{ day: 'Daily', times: ['5:45 PM'] }],
    },
    {
      title: 'Morning and Evening Prayer',
      icon: <FaClock className="text-2xl" />,
      image: 'https://gv0zzhe6ot.ufs.sh/f/qNNctTpmyN4MrpHd3Fb2k1SpQGxfEXm9i8TetMBIULur6dZV',
      schedules: [{ day: 'Weekdays', times: ['15 minutes before mass'] }],
    },
  ];

  const tabVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  return (
    <div className="min-h-dvh py-16 pt-24 bg-base-100">
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
              className="space-y-6"
            >
              <div className="relative w-full min-h-90">
                <Image
                  src="https://gv0zzhe6ot.ufs.sh/f/qNNctTpmyN4MRmF5GzONjIzrhcLZFMG7lqYpdQCf9vaRBPD0"
                  alt="Mass Schedule"
                  fill
                  className="object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-base-100 to-transparent opacity-60"></div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {massSchedules.map((schedule) => (
                  <div key={schedule.day} className="card bg-base-200 shadow-md p-6">
                    <h2 className="text-xl font-bold mb-4">{schedule.day}</h2>
                    <div className="grid grid-cols-2 gap-4">
                      {schedule.times.map((time) => (
                        <div key={time} className="flex items-center gap-2">
                          <FaClock className="text-primary" />
                          <span>{time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'Confession' && (
            <motion.div
              key="Confession"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={tabVariants}
              className="space-y-6"
            >
              <div className="relative w-full min-h-90">
                <Image
                  src="https://gv0zzhe6ot.ufs.sh/f/qNNctTpmyN4MouryarDFvpgnQWkasj82S6td5AU4DmGhYlJP"
                  alt="Confession Schedule"
                  fill
                  className="object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-base-100 to-transparent opacity-60"></div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {confessionSchedules.map((schedule) => (
                  <div key={schedule.day} className="card bg-base-200 shadow-md p-6">
                    <h2 className="text-xl font-bold mb-4">{schedule.day}</h2>
                    {schedule.times.map((time) => (
                      <div key={time} className="flex items-center gap-2">
                        <FaClock className="text-primary" />
                        <span>{time}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'Other' && (
            <motion.div
              key="Other"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={tabVariants}
              className="space-y-6"
            >
              {otherServices.map((service) => (
                <div key={service.title} className="card bg-base-200 shadow-md">
                  <div className="flex flex-col md:flex-row gap-6 lg:min-h-60">
                    <div className="relative w-full md:w-1/3 h-[200px] md:h-auto">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover rounded-lg"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-base-100 to-transparent opacity-60"></div>
                    </div>
                    <div className="flex-1 m-6">
                      <div className="flex items-center gap-3 mb-6">
                        {service.icon}
                        <h2 className="text-xl font-bold">{service.title}</h2>
                      </div>
                      <div className="space-y-4">
                        {service.schedules.map((schedule) => (
                          <div key={schedule.day}>
                            <p className="font-semibold mb-2">{schedule.day}</p>
                            {schedule.times.map((time) => (
                              <div key={time} className="flex items-center gap-2 pb-2">
                                <FaClock className="text-primary" />
                                <span>{time}</span>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
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