"use client";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { projectShowcase } from "@/app/api/data";
import { getImagePrefix } from "@/utils/utils";

const DISPLAY_COUNT = 6;
const ROTATE_INTERVAL = 5500;
const ROTATE_STEP = 3;

const Portfolio = () => {
  const [projectIndex, setProjectIndex] = useState(0);
  const project = projectShowcase[projectIndex];
  const highlightCount = project.highlights.length;
  const visibleCount = Math.min(DISPLAY_COUNT, highlightCount);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    setStartIndex(0);
  }, [projectIndex]);

  useEffect(() => {
    if (highlightCount <= visibleCount) {
      return;
    }
    const timer = setInterval(() => {
      setStartIndex((prev) => (prev + ROTATE_STEP) % highlightCount);
    }, ROTATE_INTERVAL);
    return () => clearInterval(timer);
  }, [highlightCount, visibleCount]);

  const currentHighlights = useMemo(() => {
    return Array.from({ length: visibleCount }, (_, idx) => {
      const index = (startIndex + idx) % highlightCount;
      return project.highlights[index];
    });
  }, [highlightCount, project.highlights, startIndex, visibleCount]);

  return (
    <section
      className="relative min-h-screen flex items-center py-20 sm:py-24 md:py-28"
      id="portfolio"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-dark/80 via-deepSlate/70 to-dark/80" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-24 h-72 w-72 rounded-full bg-primary/10 blur-220" />
        <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-secondary/10 blur-220" />
      </div>

      <div className="container relative mx-auto lg:max-w-screen-xl px-4 sm:px-6 w-full">
          <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid items-center gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
          >
          <div className="max-w-xl">
            <p className="text-muted text-18 sm:text-20 mb-4">
              {project.badge}{" "}
              <span className="text-primary">{project.client}</span>
            </p>
            <h2 className="text-white text-32 sm:text-40 lg:text-48 font-semibold leading-tight mb-5">
              {project.title}
            </h2>
            <p className="text-muted text-opacity-70 text-16 sm:text-18 leading-relaxed">
              {project.summary}
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${project.id}-${startIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            >
              {currentHighlights.map((highlight, idx) => (
                <div
                  key={`${highlight.title}-${idx}`}
                  className={`flex h-full min-h-[160px] flex-col justify-between rounded-2xl border border-dark_border/10 bg-dark/60 p-5 text-left transition duration-300 hover:-translate-y-1 hover:shadow-lg ${highlight.accent}`}
                  >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h4 className="text-white text-18 sm:text-20 font-semibold">
                      {highlight.title}
                    </h4>
                    {highlight.icon && (
                      <div className="shrink-0 rounded-full bg-white/10 p-2">
                        <Image
                          src={`${getImagePrefix()}${highlight.icon}`}
                          alt={highlight.title}
                          width={32}
                          height={32}
                          className="h-6 w-6 object-contain"
                        />
                      </div>
                    )}
                  </div>
                  <p className="text-muted text-opacity-60 text-14 sm:text-16 leading-relaxed">
                    {highlight.description}
                  </p>
                      </div>
                ))}
            </motion.div>
          </AnimatePresence>
          </motion.div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {projectShowcase.map((proj, idx) => {
            const isActive = idx === projectIndex;
            return (
              <button
                key={proj.id}
                type="button"
                onClick={() => setProjectIndex(idx)}
                className={`rounded-full border border-white/10 px-4 py-2 text-14 sm:text-16 transition ${
                  isActive
                    ? "bg-primary text-white shadow-lg"
                    : "bg-dark/60 text-muted hover:bg-dark/80 hover:text-white"
                }`}
              >
                {proj.client}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
