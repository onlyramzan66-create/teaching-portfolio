"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Spotlight } from "../components/ui/Spotlight";
import { InfiniteMovingCards } from "../components/ui/infinite-moving-cards";
import {
  Award,
  BookOpen,
  CheckCircle,
  Clock,
  Globe,
  GraduationCap,
  Heart,
  Lightbulb,
  MapPin,
  Star,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

const BackgroundBeams = dynamic(
  () => import("../components/ui/background-beams").then((mod) => mod.BackgroundBeams),
  { ssr: false },
);

export default function AboutPage() {
  const stats = [
    { number: "500+", label: "Students Guided", icon: Users },
    { number: "5+", label: "Years of Teaching", icon: Award },
    { number: "98%", label: "Improvement Rate", icon: TrendingUp },
    { number: "24/7", label: "Parent Support", icon: Clock },
  ];

  const values = [
    {
      title: "Qualified Teachers",
      description: "Experienced mentors for O Level, A Level, Matric, and Intermediate tracks.",
      icon: GraduationCap,
    },
    {
      title: "Concept-First Teaching",
      description: "We focus on understanding, not memorization, through structured lesson planning.",
      icon: Lightbulb,
    },
    {
      title: "Consistent Assessment",
      description: "Regular quizzes, revision sessions, and performance reports keep students on track.",
      icon: Target,
    },
  ];

  const learningModel = [
    "One-on-one and small group classes",
    "Weekly progress tracking and parent updates",
    "Exam-focused preparation with past-paper practice",
    "Flexible scheduling for local and overseas students",
  ];

  const subjects = ["Chemistry", "Computer Science", "Mathematics", "Physics", "Biology"];

  const testimonials = [
    {
      quote: "Exceptional teaching methodology and personalized attention helped me excel in my A-Level examinations.",
      name: "Sarah Ahmed",
      title: "A-Level Student",
    },
    {
      quote: "The interactive online sessions made complex physics concepts easy to understand. Highly recommended!",
      name: "Muhammad Ali",
      title: "FSc Student",
    },
    {
      quote: "Professional approach with clear objectives and practical examples. Best online tutoring experience.",
      name: "Ayesha Khan",
      title: "Computer Science Student",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-black text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-emerald-900/10 to-transparent -z-10" />

      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      <Spotlight className="top-40 right-0 md:right-60 md:top-20" fill="blue" />
      <Spotlight className="bottom-40 left-1/2" fill="emerald" />
      <BackgroundBeams className="opacity-20" />

      <section className="relative pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white via-blue-100 to-emerald-200 bg-clip-text text-transparent"
          >
            About GoharOnline
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-10"
          >
            We help students build strong academic foundations through clear teaching, live interaction, and disciplined exam preparation.
            <span className="text-emerald-400 font-semibold"> Every class is designed for confidence and results.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                <stat.icon className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 max-w-3xl mx-auto rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-4"
          >
            <div className="flex items-center justify-center gap-2 text-emerald-300 font-medium">
              <MapPin className="w-4 h-4" />
              Home tutor service is available for Pakistani students in selected cities.
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-8"
          >
            <h2 className="text-3xl font-bold mb-5 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">Our Mission</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              To make high-quality education accessible for students everywhere by combining expert tutoring, structured plans, and practical exam strategy.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-emerald-400" /><span className="text-gray-300">Structured lesson plans for each subject</span></div>
              <div className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-emerald-400" /><span className="text-gray-300">Weekly goals and measurable progress</span></div>
              <div className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-emerald-400" /><span className="text-gray-300">Focused preparation for school and board exams</span></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-8"
          >
            <Heart className="w-14 h-14 text-blue-300 mb-4" />
            <h3 className="text-3xl font-bold mb-4">Our Vision</h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              To become a trusted global online learning platform where students consistently improve grades and build long-term confidence.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/40 bg-blue-400/10 px-4 py-2 text-blue-200">
              <Globe className="w-4 h-4" />
              Teaching students worldwide
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-5 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">Why Families Choose Us</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">A teaching model designed for real progress, not just attendance.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
              >
                <item.icon className="w-12 h-12 text-emerald-400 mb-4" />
                <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                <p className="text-gray-300 leading-7">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/10 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 p-8"
          >
            <h2 className="text-3xl font-bold mb-4">Our Learning Model</h2>
            <div className="space-y-3">
              {learningModel.map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5" />
                  <p className="text-gray-300">{point}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/10 bg-white/5 p-8"
          >
            <h2 className="text-3xl font-bold mb-5">Subjects We Teach</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
              {subjects.map((subject) => (
                <div key={subject} className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-center text-emerald-200 font-medium">
                  {subject}
                </div>
              ))}
            </div>
            <p className="text-gray-300 text-sm leading-7">
              Programs are available for Matric, Intermediate, O Level, and A Level students.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 text-yellow-300">
              <BookOpen className="w-4 h-4" />
              <span className="text-sm">Past-paper practice + concept reinforcement</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Student Feedback</h2>
            <div className="flex justify-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
          </motion.div>

          <InfiniteMovingCards items={testimonials} direction="right" speed="slow" className="max-w-6xl mx-auto" />
        </div>
      </section>

      <section className="py-20 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-purple-500/10 border border-emerald-500/20 rounded-2xl p-8 md:p-12"
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">Ready to Begin?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Book a free demo class and evaluate the teaching method before you enroll.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
              >
                Book Free Demo
              </Link>
              <Link
                href="/science"
                className="px-8 py-4 border-2 border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-white font-semibold rounded-xl transition-all duration-300"
              >
                View Courses
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
