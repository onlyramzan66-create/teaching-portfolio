'use client';

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Spotlight } from "../components/ui/Spotlight";
import { Button } from "./ui/moving-border";
import { ChevronDown, BookOpen, Code, Globe, Users, Star, Award, Clock } from "lucide-react";

function HeroSection() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative mt-16 min-h-screen flex items-center overflow-visible">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-purple-900/10 to-transparent -z-10" />

      {/* Multiple Spotlights for depth */}
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      <Spotlight className="top-40 right-0 md:right-60 md:top-20" fill="blue" />

      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-500/10 rounded-lg blur-lg animate-bounce delay-500" />

      <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center relative z-10">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="p-8 md:p-12 relative z-20"
        >
          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="flex items-center gap-1 text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
            <span className="text-gray-300 text-sm">Trusted by 1000+ Students</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Online and Home Tutor Support for
            <span className="block bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              O/A Level, Matric, FSC
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-gray-300 text-xl mb-8 leading-relaxed max-w-lg"
          >
            Learn with expert tutors for Science, Mathematics, Computer Science, Quran Studies, and Web Development. Available online worldwide and in-person home tutoring in selected Pakistani cities.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {["Cambridge", "Edexcel", "FBISE", "Punjab Board", "Sindh Board"].map(
              (board) => (
                <span
                  key={board}
                  className="px-3 py-1 rounded-full border border-white/20 bg-white/5 text-xs text-gray-200"
                >
                  {board}
                </span>
              )
            )}
          </motion.div>

          {/* Enhanced Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="grid grid-cols-2 gap-4 mb-8"
          >
            <div className="flex items-center gap-3 text-emerald-400 bg-emerald-400/10 p-3 rounded-lg">
              <BookOpen size={20} />
              <span className="text-sm font-medium">Quran Studies</span>
            </div>
            <div className="flex items-center gap-3 text-blue-400 bg-blue-400/10 p-3 rounded-lg">
              <Code size={20} />
              <span className="text-sm font-medium">Computer Science</span>
            </div>
            <div className="flex items-center gap-3 text-purple-400 bg-purple-400/10 p-3 rounded-lg">
              <Globe size={20} />
              <span className="text-sm font-medium">Web Development</span>
            </div>
            <div className="flex items-center gap-3 text-orange-400 bg-orange-400/10 p-3 rounded-lg">
              <Award size={20} />
              <span className="text-sm font-medium">Expert Teachers</span>
            </div>
          </motion.div>

          {/* Enhanced CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="relative flex flex-col sm:flex-row gap-4 z-[9990]"
            ref={menuRef}
          >
            <Button
              onClick={() => setOpen(!open)}
              className="px-8 py-4 text-base font-semibold bg-gradient-to-r from-emerald-500 to-blue-500 shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
            >
              Explore Study Levels
              <ChevronDown
                className={`ml-2 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                size={18}
              />
            </Button>

            {/* Enhanced Dropdown */}
            {open && (
              <motion.div
                initial={{ opacity: 0, height: 0, scale: 0.95 }}
                animate={{ opacity: 1, height: "auto", scale: 1 }}
                exit={{ opacity: 0, height: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute top-full mt-2 w-full max-w-sm bg-black/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-4 z-50"
              >
                <div className="grid gap-4">
                  {/* Main Navigation Links */}
                  <div className="border-b border-white/10 pb-3 mb-3">
                    <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide">Main Pages</h4>
                    <div className="grid gap-2">
                      <Link href="/" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-300 group">
                        <div className="w-2 h-2 bg-white rounded-full group-hover:scale-125 transition-transform"></div>
                        <span className="font-medium">Home</span>
                      </Link>
                      <Link href="/about" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-400/10 text-gray-300 hover:text-blue-400 transition-all duration-300 group">
                        <Users size={18} className="text-blue-400 group-hover:scale-110 transition-transform" />
                        <span className="font-medium">About Us</span>
                      </Link>
                      <Link href="/contact" className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-400/10 text-gray-300 hover:text-green-400 transition-all duration-300 group">
                        <Award size={18} className="text-green-400 group-hover:scale-110 transition-transform" />
                        <span className="font-medium">Contact Us</span>
                      </Link>
                    </div>
                  </div>

                  {/* Course Categories */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide">Our Courses</h4>
                    <div className="grid gap-2">
                      <Link href="/matric" className="flex items-center gap-3 p-3 rounded-lg hover:bg-emerald-400/10 text-gray-300 hover:text-emerald-400 transition-all duration-300 group">
                        <BookOpen size={18} className="text-emerald-400 group-hover:scale-110 transition-transform" />
                        <div>
                          <div className="font-medium">Matric</div>
                          <div className="text-xs text-gray-400">Math, Physics, Chemistry, Biology</div>
                        </div>
                      </Link>
                      <Link href="/fsc" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-400/10 text-gray-300 hover:text-blue-400 transition-all duration-300 group">
                        <Code size={18} className="text-blue-400 group-hover:scale-110 transition-transform" />
                        <div>
                          <div className="font-medium">FSC</div>
                          <div className="text-xs text-gray-400">Pre-Medical, Pre-Engineering, ICS</div>
                        </div>
                      </Link>
                      <Link href="/o-a-level" className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-400/10 text-gray-300 hover:text-purple-400 transition-all duration-300 group">
                        <BookOpen size={18} className="text-purple-400 group-hover:scale-110 transition-transform" />
                        <div>
                          <div className="font-medium">O / A Level</div>
                          <div className="text-xs text-gray-400">Cambridge and Edexcel tracks</div>
                        </div>
                      </Link>
                      <Link href="/quran" className="flex items-center gap-3 p-3 rounded-lg hover:bg-orange-400/10 text-gray-300 hover:text-orange-400 transition-all duration-300 group">
                        <Code size={18} className="text-orange-400 group-hover:scale-110 transition-transform" />
                        <div>
                          <div className="font-medium">Quran Online Teaching</div>
                          <div className="text-xs text-gray-400">Nazra, Hifz, Tajweed</div>
                        </div>
                      </Link>
                      <Link href="/web-development" className="flex items-center gap-3 p-3 rounded-lg hover:bg-pink-400/10 text-gray-300 hover:text-pink-400 transition-all duration-300 group">
                        <Globe size={18} className="text-pink-400 group-hover:scale-110 transition-transform" />
                        <div>
                          <div className="font-medium">Web Development</div>
                          <div className="text-xs text-gray-400">Full Stack Development</div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <Link href="/contact">
              <button className="px-8 py-4 rounded-xl border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm">
                Book Free Demo
              </button>
            </Link>
            <Link href="/home-tutor-pakistan">
              <button className="px-8 py-4 rounded-xl border-2 border-emerald-400/40 text-emerald-300 hover:bg-emerald-500/10 hover:border-emerald-300 transition-all duration-300 backdrop-blur-sm">
                Home Tutor Pakistan
              </button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-wrap gap-6 mt-8 pt-8 border-t border-white/10"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-400">1000+</div>
              <div className="text-sm text-gray-400">Happy Students</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">50+</div>
              <div className="text-sm text-gray-400">Expert Teachers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">24/7</div>
              <div className="text-sm text-gray-400">Support Available</div>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative flex justify-center z-10"
        >
          <div className="relative group">
            {/* Enhanced glow effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/30 via-blue-400/30 to-purple-400/30 rounded-full blur-3xl opacity-75 animate-pulse group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-emerald-400/20 rounded-full blur-2xl animate-pulse delay-1000" />

            <div className="relative w-[350px] h-[350px] md:w-[450px] md:h-[450px] rounded-full overflow-hidden shadow-2xl border-4 border-white/20 group-hover:border-white/30 transition-all duration-500">
              <Image
                src="/courses/hero.png"
                alt="GoharOnline Online Learning Platform"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>

            {/* Enhanced floating elements */}
            <motion.div
              className="absolute top-4 right-4 w-16 h-16 rounded-full border-2 border-white/30 backdrop-blur-sm bg-white/10 flex items-center justify-center"
              animate={{
                y: [0, -15, 0],
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Star className="text-yellow-400" size={24} fill="currentColor" />
            </motion.div>

            <motion.div
              className="absolute -top-6 -right-6 bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-4 py-2 rounded-full font-bold shadow-lg backdrop-blur-sm border border-white/20"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              1000+ Students
            </motion.div>

            <motion.div
              className="absolute -bottom-6 -left-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full font-bold shadow-lg backdrop-blur-sm border border-white/20"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              Expert Teachers
            </motion.div>

            {/* New floating achievement badges */}
            <motion.div
              className="absolute top-1/4 -left-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm border border-white/20"
              animate={{
                x: [0, 10, 0],
                y: [0, -5, 0]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              95% Success Rate
            </motion.div>

            <motion.div
              className="absolute bottom-1/4 -right-8 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm border border-white/20"
              animate={{
                x: [0, -10, 0],
                y: [0, 5, 0]
              }}
              transition={{ duration: 4, repeat: Infinity, delay: 2 }}
            >
              24/7 Support
            </motion.div>
          </div>
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default HeroSection;
