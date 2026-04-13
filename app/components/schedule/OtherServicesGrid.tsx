'use client';

import type { ReactNode } from 'react';
import { FaClock } from 'react-icons/fa';
import Image from 'next/image';

type DaySchedule = {
  day: string;
  times: string[];
};

type OtherService = {
  title: string;
  icon: ReactNode;
  image: string;
  schedules: DaySchedule[];
};

export default function OtherServicesGrid({ services }: { services: OtherService[] }) {
  return (
    <>
      {services.map((service) => (
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
    </>
  );
}