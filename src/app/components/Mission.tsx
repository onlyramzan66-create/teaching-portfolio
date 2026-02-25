'use client'

import React from "react";
import { motion } from "framer-motion";
import { Target, Users, Award, Globe, BookOpen, TrendingUp } from "lucide-react";

export default function AboutSection() {
  const features = [
    {
      id: 1,
      icon: Target,
      title: "Our Mission",
      description:
        "To democratize quality education by providing accessible, personalized online learning experiences that empower students worldwide to achieve academic excellence.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      icon: Users,
      title: "Student-Centered Approach",
      description:
        "We focus on individual student success through adaptive learning paths, expert mentorship, and continuous academic support tailored to each learner's needs.",
      color: "from-emerald-500 to-teal-500"
    },
    {
      id: 3,
      icon: Award,
      title: "Excellence in Education",
      description:
        "Our team of qualified educators and subject matter experts delivers comprehensive, up-to-date curriculum aligned with international standards and exam boards.",
      color: "from-purple-500 to-pink-500"
    },
  ];

  const subjects = [
    {
      id: 1,
      title: "Quran Studies",
      description: "Comprehensive online Quran education with Tajweed, memorization, and Islamic studies",
      icon: BookOpen,
      color: "text-emerald-500"
    },
    {
      id: 2,
      title: "Mathematics",
      description: "Complete mathematics curriculum from basic concepts to advanced calculus and statistics",
      icon: TrendingUp,
      color: "text-blue-500"
    },
    {
      id: 3,
      title: "Physics",
      description: "In-depth physics education covering mechanics, thermodynamics, optics, and modern physics",
      icon: Globe,
      color: "text-purple-500"
    },
    {
      id: 4,
      title: "Chemistry",
      description: "Comprehensive chemistry program including organic, inorganic, and physical chemistry",
      icon: Award,
      color: "text-orange-500"
    },
    {
      id: 5,
      title: "Computer Science",
      description: "Programming, algorithms, data structures, and modern computing technologies",
      icon: Target,
      color: "text-cyan-500"
    },
    {
      id: 6,
      title: "Web Development",
      description: "Full-stack web development with modern frameworks and industry best practices",
      icon: Globe,
      color: "text-pink-500"
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent" />
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-400/20 rounded-full mb-6"
          >
            <span className="text-emerald-400 font-medium text-sm">About GoharOnline</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Empowering Education Through
            <span className="block bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Innovation & Excellence
            </span>
          </h2>

          <p className="text-gray-300 text-xl leading-relaxed max-w-3xl mx-auto">
            We are a dedicated team of educators and technologists committed to revolutionizing online learning
            by combining cutting-edge technology with proven teaching methodologies.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 rounded-2xl backdrop-blur-sm border border-white/10 group-hover:border-white/20 transition-all duration-300" />

              <div className="relative p-8 h-full">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-6`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-emerald-400 transition-colors duration-300">
                  {feature.title}
                </h3>

                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Subjects Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/20 rounded-full mb-6"
          >
            <span className="text-purple-400 font-medium text-sm">Our Subjects</span>
          </motion.div>

          <h3 className="text-3xl md:text-4xl font-bold text-white mb-12">
            Comprehensive Learning Across
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Multiple Disciplines
            </span>
          </h3>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {subjects.map((subject, index) => (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-white/5"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-2 rounded-lg bg-white/10 ${subject.color}`}>
                    <subject.icon size={20} />
                  </div>
                  <h4 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors duration-300">
                    {subject.title}
                  </h4>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {subject.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
