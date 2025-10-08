'use client';
import { useState } from 'react';
import { FaInfoCircle, FaCalendarAlt, FaClipboardList, FaExclamationTriangle } from 'react-icons/fa';
import { MdClose, MdInfo } from 'react-icons/md';
import Image from 'next/image';

interface RequirementCategory {
  title: string;
  items: string[];
}

interface BaptismRequirements {
  infant02: RequirementCategory;
  infant36: RequirementCategory;
  child: RequirementCategory;
}

interface WeddingRequirements {
  regular: RequirementCategory;
  civillyMarried: RequirementCategory;
  cohabiting: RequirementCategory;
  foreignMarriage: RequirementCategory;
}

interface ServiceCardProps {
  title: string;
  description: string;
  requirements: string[] | BaptismRequirements | WeddingRequirements;
  contactInfo: string;
  image: string;
  shortDescription: string;
  schedules?: Schedules;
  reminders?: string[];
}

interface Schedule {
  title: string;
  schedule: string;
  seminar: string;
  donation: string;
}

interface Schedules {
  group: Schedule;
  special: Schedule;
}

export default function ServiceCard({
  title,
  description,
  requirements,
  contactInfo,
  image,
  shortDescription,
  schedules,
  reminders
}: ServiceCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('info');

  // Check if requirements is empty
  const hasRequirements = Array.isArray(requirements) 
    ? requirements.length > 0 
    : Object.keys(requirements || {}).length > 0;

  return (
    <>
      <div className="group relative cursor-pointer h-full" onClick={() => setIsModalOpen(true)}>
        <div className="h-full w-full overflow-hidden">
          <Image
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            width={800}
            height={600}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 text-white">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">{title}</h2>
          <p className="text-xs sm:text-sm mb-4">{shortDescription}</p>
          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <FaInfoCircle className="animate-bounce sm:animate-none sm:group-hover:animate-bounce" />
            <span className="sm:hidden">Tap for more details</span>
            <span className="hidden sm:group-hover:block">Click for more details</span>
          </div>
        </div>
      </div>

      <dialog id={`modal-${title}`} className={`modal ${isModalOpen ? 'modal-open' : ''}`}>
        <div className="modal-box max-w-3xl max-h-[80vh] p-6 overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-2xl">{title}</h3>
            <button 
              className="btn btn-circle btn-sm"
              onClick={() => setIsModalOpen(false)}
            >
              <MdClose className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="tabs tabs-boxed mb-6">
            <button 
              className={`tab gap-2 ${activeTab === 'info' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('info')}
            >
              <MdInfo className="w-4 h-4" /> Overview
            </button>
            {hasRequirements && (
              <button 
                className={`tab gap-2 ${activeTab === 'requirements' ? 'tab-active' : ''}`}
                onClick={() => setActiveTab('requirements')}
              >
                <FaClipboardList className="w-4 h-4" /> Requirements
              </button>
            )}
            {schedules && (
              <button 
                className={`tab gap-2 ${activeTab === 'schedules' ? 'tab-active' : ''}`}
                onClick={() => setActiveTab('schedules')}
              >
                <FaCalendarAlt className="w-4 h-4" /> Schedules
              </button>
            )}
            {reminders && (
              <button 
                className={`tab gap-2 ${activeTab === 'reminders' ? 'tab-active' : ''}`}
                onClick={() => setActiveTab('reminders')}
              >
                <FaExclamationTriangle className="w-4 h-4" /> Reminders
              </button>
            )}
          </div>

          {/* Content Sections */}
          <div className="space-y-4">
            {/* Overview Tab */}
            {activeTab === 'info' && (
              <div className="prose max-w-none">
                <p className="text-lg">{description}</p>
                <div className="alert alert-info mt-4">
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <p>{contactInfo}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Requirements Tab */}
            {activeTab === 'requirements' && hasRequirements && (
              <div className="space-y-4">
                {Array.isArray(requirements) ? (
                  <ul className="steps steps-vertical w-full">
                    {requirements.map((req, index) => (
                      <li key={index} className="step step-primary">{req}</li>
                    ))}
                  </ul>
                ) : (
                  <div className="space-y-6">
                    {Object.entries(requirements).map(([key, category]: [string, RequirementCategory]) => (
                      <div key={key} className="card bg-base-200">
                        <div className="card-body">
                          <h4 className="card-title">{category.title}</h4>
                          <ul className="list-disc list-inside">
                            {category.items.map((item: string, index: number) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Schedules Tab */}
            {activeTab === 'schedules' && schedules && (
              <div className="grid gap-4 md:grid-cols-2">
                {Object.entries(schedules).map(([key, schedule]) => (
                  <div key={key} className="card bg-base-200">
                    <div className="card-body">
                      <h4 className="card-title">{schedule.title}</h4>
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <span className="font-semibold">Schedule:</span>
                          <span>{schedule.schedule}</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="font-semibold">Seminar:</span>
                          <span>{schedule.seminar}</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="font-semibold">Donation:</span>
                          <span>{schedule.donation}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Reminders Tab */}
            {activeTab === 'reminders' && reminders && (
              <div className="card bg-base-200">
                <div className="card-body">
                  <div className="alert alert-warning mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    <span>Important Reminders</span>
                  </div>
                  <ul className="space-y-2">
                    {reminders.map((reminder, index) => (
                      <li key={index} className="flex gap-2 items-start">
                        <span className="badge badge-primary mt-1">!</span>
                        {reminder}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <button className="cursor-default">close</button>
        </div>
      </dialog>
    </>
  );
}