"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { getImagePrefix } from "@/utils/utils";

const Team = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const teamMembers = [
    {
      id: 1,
      name: "Juan José Ochoa",
      role: "Tech Lead & Full-Stack",
      description: "8+ years | React, Node.js, Cloud | 20+ projects delivered",
      gradient: "from-purple-900/50 via-purple-800/40 to-purple-900/50",
      roleColor: "text-purple-400",
      image: "images/member-1.jpeg",
    },
    {
      id: 2,
      name: "Daniela Villa",
      role: "Senior Backend Engineer",
      description: "6+ years | Microservices, API Design | Enterprise solutions",
      gradient: "from-green-900/50 via-green-800/40 to-green-900/50",
      roleColor: "text-green-400",
      image: null, // Placeholder
    },
    {
      id: 3,
      name: "Moises Carrillo",
      role: "DevOps & Cloud",
      description: "AWS, Docker, K8s | Infrastructure optimization | 40% cost reduction",
      gradient: "from-amber-900/50 via-amber-800/40 to-amber-900/50",
      roleColor: "text-purple-400",
      image: null, // Placeholder
    },
  ];

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % teamMembers.length);
    }, 2000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [teamMembers.length]);

  const currentMember = teamMembers[currentIndex];

  return (
    <section
      className="relative pb-20 sm:pb-24 md:pb-28 xl:pb-28"
      id="team"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-dark/80 via-deepSlate/70 to-dark/80" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-24 h-72 w-72 rounded-full bg-primary/10 blur-220" />
        <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-secondary/10 blur-220" />
      </div>

      <div className="container relative mx-auto lg:max-w-screen-xl px-4 sm:px-6 w-full">
        {/* Header Section */}
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12 relative z-20"
        >
          <p className="text-muted text-18 sm:text-20 mb-3">
            Meet our <span className="text-primary">team</span>
          </p>
          <h2 className="text-white text-32 sm:text-40 lg:text-48 font-semibold leading-tight mb-4">
            Our organizational structure.
          </h2>
          <div className="max-w-2xl mx-auto">
            <p className="text-muted text-opacity-70 text-16 sm:text-18 leading-relaxed">
              At Servus, we transform ideas into powerful digital solutions through technology, expertise, and dedication.
            </p>
          </div>
        </motion.div>

        {/* Team Cards - Mobile Carousel / Desktop Grid */}
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          {/* Mobile/Tablet Carousel (hidden on lg and up) */}
          <div className="lg:hidden flex justify-center pt-4">
            <div className="w-full max-w-[21rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentMember.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -4,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                    filter: "brightness(1.1)",
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  className={`relative rounded-2xl bg-gradient-to-br ${currentMember.gradient} p-8 min-h-[300px] flex flex-col justify-center items-center text-center shadow-xl overflow-hidden`}
                  style={{ willChange: 'transform' }}
                >
                  {/* Image overlay with gradient */}
                  {currentMember.image && (
                    <motion.div 
                      className="absolute inset-0"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={`${getImagePrefix()}${currentMember.image}`}
                        alt={currentMember.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-br ${currentMember.gradient}`} />
                    </motion.div>
                  )}

                  {/* Content */}
                  <div className="relative z-10 w-full">
                    <motion.p 
                      className="text-white text-14 sm:text-16 mb-4"
                      initial={{ opacity: 0.9 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {currentMember.name}
                    </motion.p>
                    <div className="mb-6 flex justify-center">
                      <motion.div 
                        className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-white/20 bg-white/10 flex items-center justify-center"
                        initial={{ scale: 1, borderColor: 'rgba(255, 255, 255, 0.2)' }}
                        whileHover={{ 
                          scale: 1.1, 
                          borderColor: 'rgba(255, 255, 255, 0.4)',
                          transition: { duration: 0.3 }
                        }}
                      >
                        {currentMember.image ? (
                          <Image
                            src={`${getImagePrefix()}${currentMember.image}`}
                            alt={currentMember.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 112px, 128px"
                          />
                        ) : (
                          <span className="text-white text-2xl sm:text-3xl font-bold">
                            {currentMember.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        )}
                      </motion.div>
                    </div>
                    <motion.h3 
                      className="text-white text-24 sm:text-28 lg:text-32 font-bold mb-3 leading-tight"
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      {currentMember.name}
                    </motion.h3>
                    <motion.p 
                      className={`${currentMember.roleColor} text-16 sm:text-18 font-semibold mb-5`}
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      {currentMember.role}
                    </motion.p>
                    <motion.p 
                      className="text-white text-14 sm:text-16 leading-relaxed px-2"
                      initial={{ opacity: 0.9 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {currentMember.description}
                    </motion.p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Carousel Indicators - Mobile/Tablet only */}
          <div className="lg:hidden flex justify-center gap-2 mt-8">
            {teamMembers.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'w-8 bg-primary' 
                    : 'w-2 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to team member ${index + 1}`}
              />
            ))}
          </div>

          {/* Desktop Grid (hidden on mobile/tablet, shown on lg and up) */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-6 pt-4 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 24 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -4,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                  filter: "brightness(1.1)",
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className={`relative rounded-2xl bg-gradient-to-br ${member.gradient} p-6 lg:p-8 min-h-[280px] lg:min-h-[300px] flex flex-col justify-center items-center text-center shadow-xl overflow-hidden`}
                style={{ willChange: 'transform' }}
              >
                {/* Image overlay with gradient */}
                {member.image && (
                  <motion.div 
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={`${getImagePrefix()}${member.image}`}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient}`} />
                  </motion.div>
                )}

                {/* Content */}
                <div className="relative z-10 w-full">
                  <motion.p 
                    className="text-white text-14 sm:text-16 mb-4"
                    initial={{ opacity: 0.9 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {member.name}
                  </motion.p>
                  <div className="mb-6 flex justify-center">
                    <motion.div 
                      className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-white/20 bg-white/10 flex items-center justify-center"
                      initial={{ scale: 1, borderColor: 'rgba(255, 255, 255, 0.2)' }}
                      whileHover={{ 
                        scale: 1.1, 
                        borderColor: 'rgba(255, 255, 255, 0.4)',
                        transition: { duration: 0.3 }
                      }}
                    >
                      {member.image ? (
                        <Image
                          src={`${getImagePrefix()}${member.image}`}
                          alt={member.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 112px, 128px"
                        />
                      ) : (
                        <span className="text-white text-2xl sm:text-3xl font-bold">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      )}
                    </motion.div>
                  </div>
                  <motion.h3 
                    className="text-white text-24 sm:text-28 lg:text-32 font-bold mb-3 leading-tight"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    {member.name}
                  </motion.h3>
                  <motion.p 
                    className={`${member.roleColor} text-16 sm:text-18 font-semibold mb-5`}
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    {member.role}
                  </motion.p>
                  <motion.p 
                    className="text-white text-14 sm:text-16 leading-relaxed px-2"
                    initial={{ opacity: 0.9 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {member.description}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Team;

