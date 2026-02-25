"use client";
import React from "react";
import { StickyScroll } from "./ui/sticky-scroll-reveal";
import { BookOpen, Users, Award, Clock, Target, Zap, Shield, Star } from "lucide-react";

const whyChooseContent = [
  {
    title: "Expert Educators & Personalized Learning",
    description:
      "Our certified teachers provide one-on-one attention, adapting lessons to your learning style and pace. Whether you're a beginner or advanced student, we ensure you master every concept with confidence.",
    icon: Users,
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Comprehensive Curriculum Across All Subjects",
    description:
      "From Quran studies and Mathematics to Physics, Chemistry, Computer Science, and Web Development - we offer complete, up-to-date curriculum aligned with international standards and exam boards.",
    icon: BookOpen,
    color: "from-emerald-500 to-teal-500"
  },
  {
    title: "Flexible Learning & 24/7 Support",
    description:
      "Learn at your convenience with flexible scheduling and round-the-clock academic support. Our platform provides recorded sessions, interactive quizzes, and instant help whenever you need it.",
    icon: Clock,
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "Proven Results & Success Stories",
    description:
      "Join thousands of successful students who have improved their grades and achieved their academic goals. Our track record speaks for itself with 95% student satisfaction and excellent exam results.",
    icon: Award,
    color: "from-orange-500 to-red-500"
  },
  {
    title: "Interactive & Engaging Learning Experience",
    description:
      "Experience modern education with live sessions, virtual labs, animated explanations, and gamified learning. We make complex subjects enjoyable and easy to understand.",
    icon: Zap,
    color: "from-cyan-500 to-blue-500"
  },
  {
    title: "Affordable Quality Education",
    description:
      "Get premium online education at competitive prices. We believe quality education should be accessible to all students, regardless of their location or background.",
    icon: Shield,
    color: "from-green-500 to-emerald-500"
  },
];

function WhyChooseUs() {
  return (
    <div className="relative py-20 bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent" />
      <div className="absolute top-10 right-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-400/20 rounded-full mb-6">
            <span className="text-emerald-400 font-medium text-sm">Why Choose Us</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Why Students Choose
            <span className="block bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              GoharOnline Academy
            </span>
          </h2>

          <p className="text-gray-300 text-xl leading-relaxed max-w-3xl mx-auto">
            Discover what makes our online learning platform the preferred choice for students worldwide
          </p>
        </div>

        {/* Sticky Scroll Content */}
        <div className="relative">
          <StickyScroll content={whyChooseContent} />
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "1000+", label: "Happy Students", icon: Users },
            { number: "50+", label: "Expert Teachers", icon: Award },
            { number: "95%", label: "Success Rate", icon: Target },
            { number: "24/7", label: "Support", icon: Clock }
          ].map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-emerald-500/10 to-blue-500/10 mb-4 group-hover:from-emerald-500/20 group-hover:to-blue-500/20 transition-all duration-300">
                <stat.icon className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors duration-300">
                {stat.number}
              </div>
              <div className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WhyChooseUs;
