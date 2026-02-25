'use client';

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Users, BookOpen, Code, Globe, Calculator, Atom, Star } from "lucide-react";

function UpcomingWebinars() {
  const webinars = [
    {
      title: 'Mastering Calculus Fundamentals',
      description: 'Build a strong foundation in calculus with step-by-step problem-solving techniques and real-world applications.',
      subject: 'Mathematics',
      icon: Calculator,
      color: 'from-blue-500 to-cyan-500',
      date: 'Dec 15, 2024',
      time: '3:00 PM PST',
      instructor: 'Dr. Sarah Johnson'
    },
    {
      title: 'Organic Chemistry Reaction Mechanisms',
      description: 'Deep dive into organic reaction mechanisms with visual explanations and practice problems for exam success.',
      subject: 'Chemistry',
      icon: Atom,
      color: 'from-green-500 to-emerald-500',
      date: 'Dec 18, 2024',
      time: '2:00 PM PST',
      instructor: 'Prof. Michael Chen'
    },
    {
      title: 'Quantum Physics Made Simple',
      description: 'Understand quantum mechanics concepts with intuitive explanations and practical problem-solving approaches.',
      subject: 'Physics',
      icon: Star,
      color: 'from-purple-500 to-pink-500',
      date: 'Dec 20, 2024',
      time: '4:00 PM PST',
      instructor: 'Dr. Emily Rodriguez'
    },
    {
      title: 'Advanced JavaScript & React Development',
      description: 'Master modern web development with hands-on projects and industry best practices for full-stack development.',
      subject: 'Web Development',
      icon: Globe,
      color: 'from-orange-500 to-red-500',
      date: 'Dec 22, 2024',
      time: '1:00 PM PST',
      instructor: 'Alex Thompson'
    },
    {
      title: 'Data Structures & Algorithms Mastery',
      description: 'Learn essential programming concepts with practical coding challenges and interview preparation techniques.',
      subject: 'Computer Science',
      icon: Code,
      color: 'from-cyan-500 to-blue-500',
      date: 'Dec 25, 2024',
      time: '3:30 PM PST',
      instructor: 'Lisa Park'
    },
    {
      title: 'Quran Memorization Techniques',
      description: 'Effective methods for Quran memorization with Tajweed rules and long-term retention strategies.',
      subject: 'Quran Studies',
      icon: BookOpen,
      color: 'from-emerald-500 to-teal-500',
      date: 'Dec 27, 2024',
      time: '5:00 PM PST',
      instructor: 'Dr. Ahmed Hassan'
    },
  ];

  return (
    <div className="relative py-20 bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-900/10 via-transparent to-transparent" />
      <div className="absolute top-10 left-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-400/20 rounded-full mb-6"
          >
            <span className="text-orange-400 font-medium text-sm flex items-center gap-2">
              <Calendar size={16} />
              Upcoming Webinars
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Free Masterclass
            <span className="block bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
              Sessions
            </span>
          </h2>

          <p className="text-gray-300 text-xl leading-relaxed max-w-3xl mx-auto">
            Join our expert instructors for free interactive sessions covering advanced topics across all subjects
          </p>
        </motion.div>

        {/* Webinars Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {webinars.map((webinar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-white/5"
            >
              {/* Subject Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${webinar.color} text-white`}>
                  <webinar.icon size={12} />
                  {webinar.subject}
                </div>
                <div className="text-gray-400 text-xs">Free</div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-emerald-400 transition-colors duration-300 leading-tight">
                {webinar.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed mb-4 group-hover:text-gray-300 transition-colors duration-300">
                {webinar.description}
              </p>

              {/* Instructor */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-400 to-blue-400 flex items-center justify-center">
                  <Users size={14} className="text-white" />
                </div>
                <span className="text-gray-300 text-sm">{webinar.instructor}</span>
              </div>

              {/* Date & Time */}
              <div className="flex items-center justify-between text-xs text-gray-400">
                <div className="flex items-center gap-1">
                  <Calendar size={12} />
                  {webinar.date}
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={12} />
                  {webinar.time}
                </div>
              </div>

              {/* Register Button */}
              <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-emerald-500 to-blue-500 text-white text-sm font-medium rounded-lg hover:from-emerald-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105">
                Register Now
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-block p-8 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-400/20 rounded-2xl backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-4">Missed a Webinar?</h3>
            <p className="text-gray-300 mb-6">Don&apos;t worry! All our webinars are recorded and available in our resource library.</p>
            <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-medium rounded-lg hover:from-emerald-600 hover:to-blue-600 transition-all duration-300">
              Access Recorded Sessions
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

export default UpcomingWebinars;
