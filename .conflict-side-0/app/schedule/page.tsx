'use client';
import { FaCalendarAlt, FaClock, FaPray, FaChurch } from 'react-icons/fa';

export default function MassSchedulePage() {
  const massSchedules = [
    { day: "Sunday", times: ["6:00 AM", "8:00 AM", "10:00 AM", "5:00 PM"] },
    { day: "Monday", times: ["6:30 AM", "5:30 PM"] },
    { day: "Tuesday", times: ["6:30 AM", "5:30 PM"] },
    { day: "Wednesday", times: ["6:30 AM", "5:30 PM"] },
    { day: "Thursday", times: ["6:30 AM", "5:30 PM"] },
    { day: "Friday", times: ["6:30 AM", "5:30 PM"] },
    { day: "Saturday", times: ["6:30 AM", "5:00 PM"] },
  ];

  const confessionSchedules = [
    { day: "Wednesday", times: ["5:30 PM - 6:00 PM"] },
    { day: "Friday", times: ["5:30 PM - 6:00 PM"] },
    { day: "Saturday", times: ["5:30 PM - 6:00"] },
  ];

  const otherServices = [
    {
      title: "Holy Hour",
      icon: <FaPray className="text-2xl" />,
      schedules: [
        { day: "Wednesdays", times: ["5:00 PM - 6:00 PM"] },
        { day: "First Friday", times: ["5:00 PM - 6:00 PM"] },
      ]
    },
    {
      title: "Rosary",
      icon: <FaChurch className="text-2xl" />,
      schedules: [
        { day: "Daily", times: ["5:45 PM"] },
      ]
    },
    {
      title: "Morning and Evening Prayer",
      icon: <FaClock className="text-2xl" />,
      schedules: [
        { day: "Weekdays", times: ["15 minutes before mass"] },
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-8">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-12">Mass Schedule</h1>

        {/* Mass Schedule Section */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-3 mb-8">
            <FaCalendarAlt className="text-3xl text-primary" />
            <h2 className="text-3xl font-bold">Regular Mass Schedule</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {massSchedules.map((schedule) => (
              <div key={schedule.day} className="card bg-base-200 shadow-lg hover:shadow-xl transition-all">
                <div className="card-body">
                  <h3 className="card-title text-xl mb-4">{schedule.day}</h3>
                  <div className="space-y-3">
                    {schedule.times.map((time) => (
                      <div key={time} className="flex items-center gap-2">
                        <FaClock className="text-primary" />
                        <span className="text-lg">{time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Confession Schedule */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-3 mb-8">
            <FaPray className="text-3xl text-primary" />
            <h2 className="text-3xl font-bold">Confession Schedule</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {confessionSchedules.map((schedule) => (
              <div key={schedule.day} className="card bg-base-200 shadow-lg hover:shadow-xl transition-all">
                <div className="card-body">
                  <h3 className="card-title text-xl mb-4">{schedule.day}</h3>
                  <div className="space-y-3">
                    {schedule.times.map((time) => (
                      <div key={time} className="flex items-center gap-2">
                        <FaClock className="text-primary" />
                        <span className="text-lg">{time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Other Services */}
        <div>
          <div className="flex items-center justify-center gap-3 mb-8">
            <FaChurch className="text-3xl text-primary" />
            <h2 className="text-3xl font-bold">Other Services</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherServices.map((service) => (
              <div key={service.title} className="card bg-base-200 shadow-lg hover:shadow-xl transition-all">
                <div className="card-body">
                  <div className="flex items-center gap-3 mb-4">
                    {service.icon}
                    <h3 className="card-title text-xl">{service.title}</h3>
                  </div>
                  {service.schedules.map((schedule) => (
                    <div key={schedule.day} className="mb-4">
                      <div className="font-semibold text-lg mb-2">{schedule.day}</div>
                      <div className="space-y-2">
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}