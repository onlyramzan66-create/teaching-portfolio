'use client';
import React from "react";
import { motion } from "framer-motion";
import { Spotlight } from "../components/ui/Spotlight";
import dynamic from "next/dynamic";
const BackgroundBeams = dynamic(
  () => import("../components/ui/background-beams").then((mod) => mod.BackgroundBeams),
  { ssr: false }
);
import { InfiniteMovingCards } from "../components/ui/infinite-moving-cards";
import {
  BookOpen,
  Users,
  Award,
  Clock,
  Star,
  CheckCircle,
  Target,
  Heart,
  Lightbulb,
  GraduationCap,
  Moon,
  Sun,
  Book
} from "lucide-react";

export default function QuranPage() {
  const stats = [
    { number: "200+", label: "Students Enrolled", icon: Users },
    { number: "8+", label: "Years Teaching", icon: Award },
    { number: "95%", label: "Completion Rate", icon: Target },
    { number: "24/7", label: "Support Available", icon: Clock }
  ];

  const programs = [
    {
      title: "Quran for Beginners",
      description: "Step-by-step lessons to start reading and understanding the Quran with proper Arabic script recognition",
      icon: BookOpen,
      features: ["Basic Arabic letters", "Word formation", "Simple verses", "Reading practice"],
      duration: "3-6 months",
      level: "Beginner"
    },
    {
      title: "Tajweed & Pronunciation",
      description: "Master the rules of Tajweed for proper Quran recitation with correct pronunciation and articulation",
      icon: GraduationCap,
      features: ["Tajweed rules", "Makhaarij points", "Pronunciation practice", "Audio feedback"],
      duration: "4-8 months",
      level: "Intermediate"
    },
    {
      title: "Hifz / Memorization",
      description: "Structured memorization program with daily targets, revision techniques, and completion tracking",
      icon: Heart,
      features: ["Daily memorization", "Revision schedules", "Progress tracking", "Completion certificates"],
      duration: "2-5 years",
      level: "All Levels"
    }
  ];

  const features = [
    {
      title: "Expert Male/Female Instructors",
      description: "Qualified Islamic scholars and Hafiz with Ijazah certificates and years of teaching experience",
      icon: GraduationCap
    },
    {
      title: "Flexible Scheduling",
      description: "One-on-one sessions at your convenient time via Zoom, Google Meet, or Skype",
      icon: Clock
    },
    {
      title: "Interactive Learning",
      description: "Whiteboard-based sessions with real-time correction and personalized attention",
      icon: BookOpen
    },
    {
      title: "Progress Tracking",
      description: "Regular assessments, progress reports, and milestone celebrations",
      icon: Target
    },
    {
      title: "Islamic Environment",
      description: "Learn in a respectful, Islamic atmosphere with proper Adab and Akhlaq",
      icon: Heart
    },
    {
      title: "Global Accessibility",
      description: "Connect with students worldwide, breaking geographical barriers in Islamic education",
      icon: Users
    }
  ];

  const testimonials = [
    {
      quote: "Alhamdulillah, I completed my Quran memorization under excellent guidance. The teachers are patient and knowledgeable.",
      name: "Fatima Ahmed",
      title: "Hifz Graduate"
    },
    {
      quote: "The Tajweed classes helped me understand proper Quran recitation. My recitation has improved tremendously.",
      name: "Omar Hassan",
      title: "Tajweed Student"
    },
    {
      quote: "Starting from zero knowledge, I can now read Quran fluently. The step-by-step approach is perfect for beginners.",
      name: "Aisha Muhammad",
      title: "Beginner Graduate"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-black text-white">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-blue-900/10 to-purple-900/10 -z-10" />

      {/* Multiple Spotlights */}
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      <Spotlight className="top-40 right-0 md:right-60 md:top-20" fill="emerald" />
      <Spotlight className="bottom-40 left-1/2" fill="blue" />

      {/* Background Beams */}
      <BackgroundBeams className="opacity-20" />

      {/* ===== HERO SECTION ===== */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-6 py-3 mb-6">
              <Moon className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-300 font-medium">Online Quran Teaching</span>
              <Sun className="w-5 h-5 text-emerald-400" />
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-emerald-400 via-blue-100 to-emerald-200 bg-clip-text text-transparent">
              Learn Quran Online
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full mx-auto mb-8"></div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8"
          >
            Master the Holy Quran with expert instructors through
            <span className="text-emerald-400 font-semibold"> personalized online classes</span>.
            From beginners to advanced learners, achieve your Islamic education goals with proper Tajweed and Hifz.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6 text-sm mb-12"
          >
            <span className="bg-emerald-500/20 text-emerald-300 px-4 py-2 rounded-full">Beginners Welcome</span>
            <span className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full">Tajweed Focus</span>
            <span className="bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full">Hifz Program</span>
            <span className="bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full">Flexible Timing</span>
          </motion.div>

          {/* Hero Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12"
          >
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                <stat.icon className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 text-center"
            >
              Start Learning Today
            </motion.a>
            <motion.a
              href="#programs"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-white font-semibold rounded-xl transition-all duration-300 text-center"
            >
              View Programs
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ===== PROGRAMS SECTION ===== */}
      <section id="programs" className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Our Quran Programs
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive courses designed for all levels, from complete beginners to advanced learners
            </p>
          </motion.div>

          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-emerald-500/10 via-blue-500/5 to-purple-500/10 border border-emerald-500/20 rounded-2xl p-8 hover:border-emerald-400/40 transition-all duration-300 group"
              >
                <div className="text-center mb-6">
                  <div className="bg-gradient-to-br from-emerald-400 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <program.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{program.title}</h3>
                  <div className="flex justify-center gap-4 text-sm">
                    <span className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full">{program.level}</span>
                    <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full">{program.duration}</span>
                  </div>
                </div>

                <p className="text-gray-300 text-center mb-6">{program.description}</p>

                <div className="space-y-3 mb-6">
                  {program.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <motion.a
                    href="/contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
                  >
                    Contact Us to Enroll
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Why Choose Our Quran Classes
            </h2>
            <p className="text-lg text-gray-300">
              Experience excellence in online Islamic education
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
              >
                <feature.icon className="w-12 h-12 text-emerald-400 mb-4" />
                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TEACHING METHODOLOGY ===== */}
      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                Our Teaching Methodology
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                We follow a comprehensive, student-centered approach that combines traditional Islamic teaching methods
                with modern educational techniques for optimal learning outcomes.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span className="text-gray-300">One-on-one personalized attention</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span className="text-gray-300">Interactive whiteboard sessions</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span className="text-gray-300">Regular progress assessments</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span className="text-gray-300">Flexible scheduling and pacing</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-2xl p-8">
                <Book className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-center mb-4">Learning Outcomes</h3>
                <div className="space-y-3 text-gray-300">
                  <p>• Correct Quran recitation with Tajweed</p>
                  <p>• Memorization of selected chapters/surahs</p>
                  <p>• Understanding of basic Islamic concepts</p>
                  <p>• Development of Islamic character and values</p>
                  <p>• Confidence in religious practices</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              What Our Students Say
            </h2>
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
          </motion.div>

          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
            className="max-w-6xl mx-auto"
          />
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Affordable Pricing
            </h2>
            <p className="text-lg text-gray-300">
              Quality Islamic education at reasonable rates
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-2xl p-8 text-center"
            >
              <h3 className="text-2xl font-bold text-white mb-4">Beginners Course</h3>
              <div className="text-4xl font-bold text-emerald-400 mb-2">$12</div>
              <div className="text-gray-400 mb-6">per hour</div>
              <ul className="text-sm text-gray-300 space-y-2 mb-6">
                <li>• Basic Arabic reading</li>
                <li>• Simple verses</li>
                <li>• 1-on-1 sessions</li>
                <li>• Progress tracking</li>
              </ul>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
              >
                Contact Us
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-2 border-blue-500/40 rounded-2xl p-8 text-center relative"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Tajweed Course</h3>
              <div className="text-4xl font-bold text-blue-400 mb-2">$15</div>
              <div className="text-gray-400 mb-6">per hour</div>
              <ul className="text-sm text-gray-300 space-y-2 mb-6">
                <li>• Complete Tajweed rules</li>
                <li>• Pronunciation practice</li>
                <li>• Audio feedback</li>
                <li>• Certificate included</li>
              </ul>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              >
                Contact Us
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-8 text-center"
            >
              <h3 className="text-2xl font-bold text-white mb-4">Hifz Program</h3>
              <div className="text-4xl font-bold text-purple-400 mb-2">$18</div>
              <div className="text-gray-400 mb-6">per hour</div>
              <ul className="text-sm text-gray-300 space-y-2 mb-6">
                <li>• Memorization guidance</li>
                <li>• Daily targets</li>
                <li>• Revision schedules</li>
                <li>• Completion certificate</li>
              </ul>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
              >
                Contact Us
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== CALL TO ACTION ===== */}
      <section className="py-20 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-purple-500/10 border border-emerald-500/20 rounded-2xl p-8 md:p-12"
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Start Your Quran Journey Today
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Book a free trial session and experience the difference in our teaching methodology.
              Begin your path to Quranic excellence with expert guidance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
              >
                Contact Us for Free Trial
              </motion.a>
              <motion.a
                href="https://wa.me/923247279379"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-white font-semibold rounded-xl transition-all duration-300"
              >
                WhatsApp Us Now
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
