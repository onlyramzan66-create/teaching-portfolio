"use client";

import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CardBody, CardContainer, CardItem } from "../components/ui/3d-card";
import computerCourses from "../components/data/computer_courses.json";
import { Star, Clock, Users, Award, Code, Database, Globe, Cpu, ChevronRight, CheckCircle, X, Monitor } from "lucide-react";

export default function ComputerPage() {
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  const stats = [
    { number: "800+", label: "Students Enrolled", icon: Users },
    { number: "4.8", label: "Average Rating", icon: Star },
    { number: "96%", label: "Success Rate", icon: Award },
    { number: "50+", label: "Projects Completed", icon: Code }
  ];

  const features = [
    {
      icon: Code,
      title: "Programming Excellence",
      description: "Master multiple programming languages with hands-on coding exercises and real-world projects"
    },
    {
      icon: Database,
      title: "Database Management",
      description: "Learn database design, SQL queries, and data management systems for modern applications"
    },
    {
      icon: Globe,
      title: "Web Development",
      description: "Build responsive websites and web applications using modern frameworks and technologies"
    },
    {
      icon: Cpu,
      title: "System Design",
      description: "Understand computer systems, algorithms, and software architecture principles"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent" />
        <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 rounded-full mb-6"
          >
            <span className="text-cyan-400 font-medium text-sm flex items-center gap-2">
              <Monitor size={16} />
              Computer Science Excellence
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Master Computer Science &
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Programming Skills
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-300 text-lg md:text-xl max-w-3xl mb-8 leading-relaxed"
          >
            Transform your future with expert-led computer science education. From programming fundamentals to advanced web development,
            our comprehensive courses prepare you for the digital world with practical skills and real-world projects.
          </motion.p>

          {/* Interactive Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mb-8 text-sm"
          >
            {[
              "🎯 Learn by Doing",
              "👨‍🏫 Expert Instructors",
              "📱 Mobile Learning",
              "🏆 Industry Recognition",
              "🤝 Community Support",
              "🚀 Career Advancement"
            ].map((benefit, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 rounded-full text-cyan-300 hover:border-cyan-400/40 transition-all duration-300 cursor-default"
              >
                {benefit}
              </motion.span>
            ))}
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex p-3 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-500/10 mb-3">
                  <stat.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="#courses">
              <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105">
                Explore Courses
              </button>
            </Link>
            <Link href="/contact">
              <button className="px-8 py-4 rounded-xl border border-white/20 text-white font-medium hover:bg-white/10 transition-all duration-300">
                Get Started Today
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Why Choose Our
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Computer Science Courses
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-white/5"
              >
                <div className="inline-flex p-3 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-500/10 mb-4">
                  <feature.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Interactive Learning Path Section */}
      <section className="py-20 bg-gradient-to-br from-cyan-900/10 via-blue-900/5 to-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Your Learning
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Journey Starts Here
              </span>
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Whether you are a complete beginner or looking to advance your career, we have the perfect path for you.
              Click on any level to explore what you&apos;ll learn and how it fits your goals.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                level: "Beginner",
                title: "Start Your Journey",
                description: "Perfect for students new to programming. Learn fundamental concepts with hands-on projects.",
                skills: ["Basic Programming", "Problem Solving", "Digital Literacy"],
                duration: "3-6 months",
                icon: "🚀",
                color: "from-green-500 to-emerald-500"
              },
              {
                level: "Intermediate",
                title: "Build Real Projects",
                description: "Develop practical skills with industry-standard tools and frameworks.",
                skills: ["Web Development", "Databases", "System Design"],
                duration: "6-12 months",
                icon: "⚡",
                color: "from-yellow-500 to-orange-500"
              },
              {
                level: "Advanced",
                title: "Master & Innovate",
                description: "Create complex applications and prepare for senior developer roles.",
                skills: ["Advanced Algorithms", "AI/ML", "Architecture"],
                duration: "12+ months",
                icon: "🎯",
                color: "from-red-500 to-pink-500"
              }
            ].map((path, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:border-cyan-400/30 transition-all duration-300 cursor-pointer"
              >
                <div className="text-center mb-6">
                  <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${path.color} mb-4 text-2xl`}>
                    {path.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{path.level}</h3>
                  <h4 className="text-cyan-400 font-medium mb-3">{path.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{path.description}</p>
                  <div className="text-xs text-gray-500 mb-4">⏱️ {path.duration}</div>
                </div>

                <div className="space-y-2">
                  <h5 className="text-white font-medium text-sm mb-3">Key Skills You&apos;ll Master:</h5>
                  {path.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      {skill}
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                  <button className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-400 font-medium hover:from-cyan-500/20 hover:to-blue-500/20 transition-all duration-300 text-sm">
                    Explore {path.level} Courses →
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Career Guidance Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Launch Your
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Tech Career
              </span>
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Our courses are designed to prepare you for high-demand careers in technology.
              Here&apos;s what our graduates are achieving:
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {[
              {
                role: "Full-Stack Developer",
                salary: "$70K - $120K/year",
                companies: "Google, Meta, Amazon",
                skills: "React, Node.js, Databases"
              },
              {
                role: "Data Scientist",
                salary: "$80K - $140K/year",
                companies: "Netflix, Uber, Airbnb",
                skills: "Python, ML, Statistics"
              },
              {
                role: "Software Engineer",
                salary: "$75K - $130K/year",
                companies: "Microsoft, Apple, Tesla",
                skills: "System Design, Algorithms"
              },
              {
                role: "DevOps Engineer",
                salary: "$85K - $135K/year",
                companies: "AWS, Cloudflare, GitLab",
                skills: "Cloud, Automation, Security"
              }
            ].map((career, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-cyan-400/30 transition-all duration-300"
              >
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {career.role}
                  </h3>
                  <div className="text-cyan-400 font-medium text-sm mb-2">{career.salary}</div>
                  <div className="text-gray-400 text-xs mb-3">{career.companies}</div>
                </div>
                <div className="text-gray-300 text-sm">
                  <strong className="text-white">Key Skills:</strong> {career.skills}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Interactive CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Your Tech Journey?</h3>
              <p className="text-gray-300 mb-6">
                Join thousands of successful graduates who have transformed their careers through our comprehensive computer science education.
                Your future in tech starts with a single step.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105">
                    Start Learning Today
                  </button>
                </Link>
                <button className="px-8 py-4 rounded-xl border border-white/20 text-white font-medium hover:bg-white/10 transition-all duration-300">
                  Download Curriculum
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Our Computer Science
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Course Offerings
              </span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
              Choose from our comprehensive range of computer science courses designed for different skill levels and career goals
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="px-4 py-2 bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
                🎓 Beginner Friendly
              </span>
              <span className="px-4 py-2 bg-yellow-500/20 text-yellow-400 rounded-full border border-yellow-500/30">
                ⚡ Hands-on Projects
              </span>
              <span className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/30">
                🎯 Career Focused
              </span>
              <span className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-full border border-purple-500/30">
                🚀 Industry Ready
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {computerCourses.courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <CardContainer>
                  <CardBody className="relative rounded-2xl p-[2px] bg-gradient-to-br from-cyan-400 via-teal-400 to-blue-500 group">
                    <div className="bg-black rounded-2xl p-6 flex flex-col h-full group-hover:bg-gray-900/50 transition-colors duration-300">

                      {/* Course Level Badge */}
                      <div className="flex justify-between items-start mb-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          course.level === 'Advanced' ? 'bg-red-500/20 text-red-400' :
                          course.level === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {course.level}
                        </span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-300">{course.rating}</span>
                        </div>
                      </div>

                      {/* Course Title */}
                      <CardItem translateZ="50" className="text-xl font-bold text-white mb-3">
                        {course.title}
                      </CardItem>

                      {/* Instructor */}
                      <CardItem translateZ="40" className="text-cyan-400 text-sm font-medium mb-3">
                        {course.instructor}
                      </CardItem>

                      {/* Description */}
                      <CardItem
                        as="p"
                        translateZ="60"
                        className="text-gray-400 text-sm leading-relaxed mb-4 flex-grow"
                      >
                        {course.description}
                      </CardItem>

                      {/* Course Details */}
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          {course.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users size={14} />
                          {course.students} students
                        </div>
                      </div>

                      {/* Topics Preview */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {course.topics.slice(0, 2).map((topic, idx) => (
                            <span key={idx} className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300">
                              {topic}
                            </span>
                          ))}
                          {course.topics.length > 2 && (
                            <span className="px-2 py-1 bg-white/10 rounded text-xs text-gray-400">
                              +{course.topics.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Enrollment Count */}
                      <div className="text-sm text-cyan-400 font-medium mb-6">
                        {course.students} students enrolled
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-3">
                        <button
                          onClick={() => setSelectedCourse(course)}
                          className="flex-1 px-4 py-3 rounded-xl text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 border border-white/20"
                        >
                          View Details
                        </button>
                        <Link href="/contact" className="flex-1">
                          <button className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-bold hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105">
                            Enroll Now
                          </button>
                        </Link>
                      </div>
                    </div>
                  </CardBody>
                </CardContainer>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Course Details Modal */}
      {selectedCourse && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedCourse(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8 overflow-y-auto max-h-[90vh]">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedCourse.level === 'Advanced' ? 'bg-red-500/20 text-red-400' :
                      selectedCourse.level === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {selectedCourse.level}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-300">{selectedCourse.rating}</span>
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2">{selectedCourse.title}</h2>
                  <p className="text-cyan-400 font-medium">{selectedCourse.instructor}</p>
                </div>
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Course Image */}
              <div className="relative w-full h-64 rounded-xl overflow-hidden mb-6">
                <Image
                  src={selectedCourse.image}
                  alt={selectedCourse.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Course Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-5 h-5 text-cyan-400" />
                    <span className="text-white font-medium">Duration</span>
                  </div>
                  <p className="text-gray-300">{selectedCourse.duration}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="w-5 h-5 text-cyan-400" />
                    <span className="text-white font-medium">Students</span>
                  </div>
                  <p className="text-gray-300">{selectedCourse.students} enrolled</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Code className="w-5 h-5 text-cyan-400" />
                    <span className="text-white font-medium">Projects</span>
                  </div>
                  <p className="text-gray-300">Hands-on coding</p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4">Course Description</h3>
                <p className="text-gray-300 leading-relaxed">{selectedCourse.description}</p>
              </div>

              {/* Topics */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4">What You&apos;ll Learn</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedCourse.topics.map((topic: string, index: number) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                      <span className="text-gray-300">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prerequisites */}
              {selectedCourse.prerequisites && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-4">Prerequisites</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCourse.prerequisites.map((prereq: string, index: number) => (
                      <span key={index} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                        {prereq}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t border-white/10">
                <Link href="/contact" className="flex-1">
                  <button className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105">
                    Enroll Now - Start Your Journey
                  </button>
                </Link>
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="px-6 py-4 rounded-xl border border-white/20 text-white font-medium hover:bg-white/10 transition-all duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Student Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900/50 via-gray-900/30 to-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              What Our
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Students Say
              </span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Real stories from real students who transformed their careers through our computer science courses
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                name: "Ahmed Khan",
                role: "Full-Stack Developer at TechCorp",
                course: "Web Development Course",
                image: "👨‍💻",
                testimonial: "The hands-on projects and real-world applications taught me more than any traditional course. I landed my dream job within 3 months of completing the course!",
                rating: 5
              },
              {
                name: "Sara Ahmed",
                role: "Data Analyst at DataFlow",
                course: "Python Programming",
                image: "👩‍💻",
                testimonial: "As someone with no programming background, I was nervous to start. The step-by-step guidance and supportive community made all the difference. Highly recommend!",
                rating: 5
              },
              {
                name: "Muhammad Ali",
                role: "Software Engineer at InnovateLabs",
                course: "A-Level Computer Science",
                image: "👨‍🎓",
                testimonial: "The course not only helped me ace my A-Levels but also gave me practical skills that got me into a top university. The instructors are amazing!",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-cyan-400/30 transition-all duration-300"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                <blockquote className="text-gray-300 text-sm leading-relaxed mb-6 italic">
  &quot;{testimonial.testimonial}&quot;
</blockquote>


                <div className="flex items-center gap-4">
                  <div className="text-2xl">{testimonial.image}</div>
                  <div>
                    <div className="text-white font-medium text-sm">{testimonial.name}</div>
                    <div className="text-cyan-400 text-xs">{testimonial.role}</div>
                    <div className="text-gray-400 text-xs">{testimonial.course}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">98%</div>
                <div className="text-gray-400 text-sm">Job Placement Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">4.9/5</div>
                <div className="text-gray-400 text-sm">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">1000+</div>
                <div className="text-gray-400 text-sm">Students Taught</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">24/7</div>
                <div className="text-gray-400 text-sm">Support Available</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Frequently Asked
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="text-gray-300 text-lg">
              Got questions? We&apos;ve got answers. Here are the most common questions about our computer science courses.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {[
              {
                question: "Do I need any prior programming experience?",
                answer: "Not at all! Our courses are designed for complete beginners. We start from the very basics and build up your skills progressively. Many of our successful students started with zero programming knowledge."
              },
              {
                question: "How long does it take to complete a course?",
                answer: "Course duration varies by program: Beginner courses take 3-6 months with 5-10 hours per week, Intermediate courses take 6-9 months, and Advanced courses can take 9-12 months. You can learn at your own pace."
              },
              {
                question: "Are the courses recognized by universities or employers?",
                answer: "Yes! Our courses are designed to meet industry standards and many universities recognize our certifications. Graduates have successfully secured positions at top tech companies and gained admission to prestigious universities."
              },
              {
                question: "What kind of support do you provide?",
                answer: "We provide 24/7 access to course materials, weekly live Q&A sessions, dedicated mentors, a vibrant community forum, and personalized feedback on your projects. You're never alone in your learning journey!"
              },
              {
                question: "Can I get a job after completing the course?",
                answer: "Absolutely! Our career services include resume building, interview preparation, job placement assistance, and connections to our network of 200+ hiring partners. 98% of our graduates find relevant employment within 6 months."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-cyan-400/30 transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {index + 1}
                  </span>
                  {faq.question}
                </h3>
                <p className="text-gray-300 leading-relaxed pl-11">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-4">Still have questions?</h3>
              <p className="text-gray-300 mb-6">
                Our expert advisors are here to help you choose the perfect course for your goals.
              </p>
              <Link href="/contact">
                <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105">
                  Get Personalized Advice
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Webinars Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Upcoming webinars section removed per site update */}
        </div>
      </section>
    </div>
  );
}
