"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface StatCounterProps {
  number: number;
  label: string;
  duration?: number;
}

const StatCounter = ({ number, label, duration = 2000 }: StatCounterProps) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const increment = Math.ceil(number / (duration / 16));

    const timer = setInterval(() => {
      start += increment;
      if (start > number) {
        setCount(number);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [number, duration, isVisible]);

  return (
    <div ref={countRef} className="relative z-10">
      <div className="text-5xl md:text-6xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-br from-amber-200 to-amber-400">
        {count}
      </div>
      <div className="uppercase tracking-widest text-sm font-medium text-amber-100/90">
        {label}
      </div>
    </div>
  );
};

export default function StatsSection() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Effets d'arrière-plan */}
      <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-amber-400/10 blur-3xl"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-amber-300/10 blur-3xl"></div>
      
      {/* Bordure circulaire subtile */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-amber-300/10 rounded-full"></div>

      <div className="container relative mx-auto px-6 z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Notre Impact Global
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-6"></div>
          <p className="text-lg text-amber-100/80 max-w-2xl mx-auto">
            Découvrez notre impact et apprenez à vivre la foi dans votre vie quotidienne.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {[
            { number: 12, label: "Églises" },
            { number: 98, label: "Membres" },
            { number: 120, label: "Sermons" },
            { number: 50, label: "Événements" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-amber-400/10 rounded-xl -z-10 transform rotate-1 group-hover:rotate-2 transition-all duration-300"></div>
              <div className="h-full bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-amber-300/20 shadow-lg group-hover:border-amber-300/40 transition-all duration-300 hover:shadow-xl hover:shadow-amber-400/10">
                <StatCounter number={stat.number} label={stat.label} />
                <div className="w-8 h-0.5 bg-gradient-to-r from-amber-400 to-transparent mx-auto mt-4 rounded-full group-hover:w-12 transition-all duration-300"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}