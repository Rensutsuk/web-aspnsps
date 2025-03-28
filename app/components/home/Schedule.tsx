export default function Schedule() {
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
      schedules: [
        { day: "Wednesdays", times: ["5:00 PM - 6:00 PM"] },
        { day: "First Friday", times: ["5:00 PM - 6:00 PM"] },
      ]
    },
    {
      title: "Rosary",
      schedules: [
        { day: "Daily", times: ["5:45 PM"] },
      ]
    },
    {
      title: "Morning and Evening Prayer",
      schedules: [
        { day: "Weekdays", times: ["15 minutes before mass"] },
      ]
    }
  ];

  return (
    <div className="py-16 bg-base-200">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Schedule of Services</h2>
        
        {/* Mass Schedule Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-6">Mass Schedule</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {massSchedules.map((schedule) => (
              <div key={schedule.day} className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title">{schedule.day}</h3>
                  <div className="flex flex-wrap gap-2">
                    {schedule.times.map((time) => (
                      <span key={time} className="badge badge-primary">{time}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Confession Schedule Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-6">Confession Schedule</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {confessionSchedules.map((schedule) => (
              <div key={schedule.day} className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title">{schedule.day}</h3>
                  <div className="flex flex-wrap gap-2">
                    {schedule.times.map((time) => (
                      <span key={time} className="badge badge-secondary">{time}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Other Services Section */}
        <div>
          <h3 className="text-2xl font-bold text-center mb-6">Other Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {otherServices.map((service) => (
              <div key={service.title} className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title">{service.title}</h3>
                  {service.schedules.map((schedule) => (
                    <div key={schedule.day} className="mb-2">
                      <div className="font-semibold">{schedule.day}</div>
                      {schedule.times.map((time) => (
                        <span key={time} className="badge badge-accent mt-1 mr-2">{time}</span>
                      ))}
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