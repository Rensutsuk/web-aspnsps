'use client';

import { FaClock } from 'react-icons/fa';

type DaySchedule = {
  day: string;
  times: string[];
};

export default function MassSchedulesGrid({ schedules }: { schedules: DaySchedule[] }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {schedules.map((schedule) => (
        <div
          key={schedule.day}
          className={`card bg-base-200 shadow-md p-6 ${schedule.day === 'Sunday' ? 'lg:col-span-3' : ''}`}
        >
          <h2 className="text-xl font-bold mb-4">{schedule.day}</h2>
          <div className="grid grid-cols-3 gap-4">
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
  );
}