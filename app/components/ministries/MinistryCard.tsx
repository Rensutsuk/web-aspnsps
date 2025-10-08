'use client'

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

export default function MinistryCard({ ministries }: { ministries: any[] }) {
  const [selectedMinistry, setSelectedMinistry] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (ministry: any) => {
    setSelectedMinistry(ministry);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {ministries.map((ministry: any, index: number) => (
        <div
          key={index}
          className="cursor-pointer bg-base-100 rounded-xl shadow-2xl overflow-hidden hover:shadow-primary transition-shadow duration-300"
          onClick={() => openModal(ministry)}
        >
          <div className="relative h-48 overflow-hidden">
            <Image
              src={ministry.image}
              alt={ministry.title}
              className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
              width={800}
              height={600}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-base-100 to-transparent opacity-60"></div>
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-3 text-primary text-center">{ministry.title}</h2>
          </div>
        </div>
      ))}
      <AnimatePresence>
        {isModalOpen && selectedMinistry && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xs"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={closeModal} // Close modal when clicking on backdrop
          >
            <motion.div
              className="relative bg-base-100 rounded-lg shadow-xl p-6 w-11/12 max-w-3xl max-h-[90vh] overflow-y-auto"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
            >
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>✕</button>
              <h3 className="font-bold text-lg text-primary mb-4">{selectedMinistry.title}</h3>
              <div className="relative h-64 w-full mb-4">
                <Image
                  src={selectedMinistry.image}
                  alt={selectedMinistry.title}
                  className="w-full h-full object-cover rounded-lg"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <p className="py-4 text-base-content/80 text-justify">{selectedMinistry.fullDescription}</p>
              {selectedMinistry.activities && selectedMinistry.activities.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-bold text-md mb-2">Activities:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedMinistry.activities.map((activity: string, idx: number) => (
                      <li key={idx}>{activity}</li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}