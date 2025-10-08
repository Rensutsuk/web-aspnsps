'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import MinistriesPage from "../components/ministries/Ministry";

export default function Ministries() {
  const [activeTab, setActiveTab] = useState('Ministries');
  
  const tabs = ['Ministries', 'Organizations', 'BEC']
  
  const tabVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  return (
    <div className="min-h-dvh py-16 pt-24 bg-base-100">
      <div className="container mx-auto px-4">
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

         <AnimatePresence mode="wait">
          {activeTab === 'Ministries' && (
            <motion.div
              key="Ministries"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={tabVariants}
              className="space-y-6"
            >
              <MinistriesPage />
            </motion.div>
          )}
          {activeTab === 'Organizations' && (
            <motion.div
              key="Organizations"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={tabVariants}
              className="space-y-6"
            >
              <h2 className="text-4xl font-bold text-center mb-16 text-primary">Organizations</h2>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}